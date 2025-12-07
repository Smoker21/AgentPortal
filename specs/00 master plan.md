# 開發企業用 Agent Based 的入口網站取代當前網站
1. 終極目標是打造以 Ontology 為主體的 AI Agent v系統，並讓公司內部數位化與自動化程序可以經由使用者自行定義 Ontology 來完成。
2. Chat mode 是 tChat, Agent mode 叫 Agent

## MVP Scope:
    1. 將目前複雜的網址查找過程透過 Ontology 的方式集中放進圖形資料庫
    2. 使用 web 介面讓使用者可以使用聊天的方式和 Agent 互動取得網址，並詢問使用者是否要開啟網頁
    3. 使用 MCP 的方式在 Chrom 瀏覽器上開啟網頁
## 使用架構:
    1. 前端使用 React
    2. 後端使用 Springboot 與 LangChain4j 
    3. 資料庫使用 Neo4j 
    4. AI Agent 使用 OpenAI

## 程式碼管理
    1. 使用 GitHub 管理程式碼
    2. 使用前後端分離的 repo 管理程式碼，前後端分別是各自的 MonoRepo
    3. 建立 CI/CD 環境，使用 GitHub Actions
    4. 使用 GitHub Pages 建立 Web 網站
    5. 需要有 readme.md 文件，說明整個專案的使用方法

## 容器組件關係
    1. 前端 Portal，運作在 Node.js 上面，使用 React 
    2. 後端運作在 Springboot+LangChain4j  上，使用 Docker 建立容器
    3. Neo4j 使用 Docker 運作，儲存 Ontology 資料
    4. AI Agent 使用本機端 Ollama 操作 LLM 模型
## Ontology 資料結構如下，請實作 UserRole, User, Intent, Application, Function, WebPage, API 作為 MVP Scope 
    ```
    CREATE (n1:UserInterface {url: "", type: ""})<-[:FALLBACK_TO]-(:API {url: "", method: "", specUrl: "", operationId: "", name: "", riskLevel: ""})<-[:INVOKES]-(n2:Function:Feature {description: "", sampleUtterance: "", abbreviation: "", riskLevel: ""})-[:SUPPORT_BY]->(:GlobalSupport {ServicePhone: ""})<-[:SUPPORT_BY]-(n0:Application {icon: "", name: ""})-[:Provides]->(n2)-[:EXPLAIN_BY]->(:UserManual:Document:Faq {link: "", version: ""}),
(:Provider {team: "", contactWindow: ""})-[:MAINTAINS]->(n0)<-[:CONTAINS]-(:ApplicationCategory:UserDomain {name: "", serviceGroup: ""})<-[:BELONG_TO]-(n0)-[:SERVICE]->(n12:UserGroup:Role {name: ""}),
(n3:User {accountId: "", name: ""})-[:ACCESS]->(n2)<-[:MATCHES]-(n11:Intent {name: "", sampleUtterance: "", embedding: "", inputSlots: "", clarifyPrompt: "", confidence: "", riskLevel: "", domain: ""})<-[:EXPRESS]-(n3)-[:AUTH_BY]->(:`A4Auth`:SSOProvider {authnMethod: "", authrGroups: ""})<-[:HAS_PERMISSION]-(n12)<-[:GRANT_TO]-(n2),
(n2)-[:DISPLAY]->(n1),
(n3)-[:BELONG_TO]->(n12)-[:CONTAINS]->(n3),
(n11)-[:SUBCATEGORY_OF]->(n11)

## Portal 需要提供三種介面給不同的使用者
    1. Nomral User Interface: 使用者可以使用聊天的方式和 Agent 互動取得網址，並詢問使用者是否要開啟網頁
    2. Knowledge Expert Interface: 知識專家可以管理特定領域的 Ontology 資料
    3. Admin Interface: 管理員可以管理所有 Ontology 資料
    4. Portal 另外一個功能是兼具溝通功能，此功能類似 Teams ，所有的使用者都需要可以快速在 Agent 與 communication 兩個模式間切換。

## 包含三個容器說明
    1. Portal 畫面容器
    2. Data Import 容器
    3. AI Agent 容器

### Portal 畫面設計如下:
        1. Portal 畫面使用 React 建立，運行在 Node.js 上面  
        2. 左上角是 communication 與 Agent 模式快速切換鈕，
        3. 右上角是使用者名稱，點擊使用者 ICON 可以快速進入使用者個人資料設定與系統設定，同時如果該使用者有多重身分，可以快速切換身分。(User Mode, Knowledge Expert Mode, Admin Mode)
        4. 上方保留一個系統快速切換的 Bookmark列，可以讓使用者釘選自己喜好的應用程式，這些應用程式靠右排列，以 icon 顯示，鼠標移上去會顯示系統名稱。
        5. Bookmark 列需要有 + 的 icon 給使用者新增應用程式，並且配備搜尋畫面，可以用傳統的名稱搜尋尋找應用程式。
        6. Portal 的中央主要是與 Agent 的對談畫面。
        7. Portal 的左側可以收合，在 Agent 模式下是對談紀錄，按照由近而遠的日期排列，點擊可以重新對談，對談紀錄下方可以搜尋對談紀錄。Agent 模式下左側的上方是專家模式，允許使用者建立專家，專家可以是 Knowledge Expert 建立的 Domain Agent (Equipment maintanence, My SOP, Command Mode)
        8. Portal 的左側在 communication 模式下是各種對談 Channel ，包含 Direct Message, Group Chat, 與 Bot Chat ，這部分只有 MVP 的基本 UI 設計，沒有實際功能。
        9. Agent 聊天的對話左下是專家選擇模式，可以選擇跟不同的專家對談，專家可以是 Knowledge Expert 建立的 Domain Agent (Equipment maintanence, My SOP, Command Mode)
        10. MVP 只實作 Agent 模式的實際串接，聊天模式只有基本的 UI 設計，沒有實際功能。
### Dat Import 容器, 後端包含資料匯入容器，其規格如下:
        1. 使用 Springboot + LangChain4j + Ollama
        2. 使用 Docker 建立容器
        3. 可以使用 command line 命令讀取特定 csv 檔案，並使用 LangChain4j 將其轉換成 Ontology 資料，並儲存到 Neo4j 中。
        4. 資料介面須建立 interface ，雖然 MVP 只實作 CSV ，但需要保留彈性給不同資料來源使用和LLM模型使用，因此 Ontology 分析與資料存取必須是不同介面的實作，以保留擴充彈性。
### 與 AI Agent 對接的後端是另外一個容器，規格如下
        1. 後端需要以 Stream API 方式串接後端，讓 AI 的回覆可以盡快到達使用者端，避免 idle 時間過長。
        2. 後端需要有基本的 UI 設計，可以讓使用者可以快速的與 AI Agent 互動。
        3. 接收使用者的對話，並使用 LLM 模型進行對話，查找 Neo4j 資料庫中的 Ontology 資料，並回覆使用者。
        4. 需要做嚴格的回覆判斷，對 Ontology 沒有定義的答案，需要回答不確定與不知道，降低 embedding 模糊比對的誤判率。
        5. 回覆內容需要實作過濾機制，MVP 中只有實作空白過濾，印出 Log 即可，不需實作。
