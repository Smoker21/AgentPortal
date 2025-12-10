
# 開發企業用 Agent Based 的入口網站取代當前網站 20251209 

## 願景描述

    Project Agent Portal 的願景是打造以 Ontology 為主體的 AI Agent 系統，並讓公司內部數位化與自動化程序可以經由使用者自行定義 Ontology 來完成。
    
## 使用場景

    1. 使用者可自行加入新的服務網址與說明，使用者可以透過聊天的方式和 AI Agent 互動取得網址，並詢問使用者是否要開啟網頁。
    2. 方便整合企業內各種網址與服務，統一透過 AI Agent 取得網址並提供服務。
    3. 使用者可自行定義 SOP 與說明文件，AI Agent 可以分析此文件，並提供相關建議。
    4. 可以輔助領域專家建立自己的 Ontology 資料結構，並將知識庫內容上傳後建 立 ontology 資料庫建立領域專家，以回答相關領域問題。
    5. 本網站需要紀錄使用者的行為，根據使用者行為模式與身分，提供相關建議。

## 現狀

    - 目前企業內部存在各種散落的服務網址，使用者搜尋不易，對常用功能以外的服務不知道在哪，尋找麻煩
    - 使用者常用的功能依照 80/20 法則，大多數僅限少數核心應用，因此需要 Bookmark 功能
    - 認知負擔過重，使用者需要記住多個網址，並在需要時快速找到
    - 網站間的關聯複雜，常需要IT團隊協助，如需要系統整合，則需要修改程式才能達到，或者使用者需要同時開啟多個視窗
    - 許多判斷是使用者在觀察 Dashboard 或資料後才能作判斷，因此需要提供一個可以快速查看 Dashboard 的功能

## MVP Scope:

    1. 將目前複雜的網址查找過程透過 Ontology 的方式集中放進圖形資料庫
    2. 使用 web 介面讓使用者可以使用聊天的方式和 Agent 互動取得網址，並詢問使用者是否要開啟網頁
    3. 使用 MCP 的方式在 Chrom 瀏覽器上開啟網頁
    4. 前後端溝通需要以 Streaming 的方式進行
    5. 系統須具備擴張能力，以應付將來功能擴展，如 LLM 模型的更換，資料庫的更換等


## 使用架構:

    1. 前端架構
        * Framework: React 18+, Ant Design
        * BFF如需要 BFF，可使用 Express, Hono, 或 Vercel.ai 等利用 Json 回傳產生簡單的 UI 給使用者輸入資料
        * Style: 使用 Ant Design 的風格
        * Graph Visualization: React Force Graph or D3 or ?
        * Communication: Server-sent events (SSE) For Agent stream response

    2. 後端架構
        * Framework: Springboot 3.x 
        * AI Orchestration: LangChain4j 
        * LLM model: 透過 LangChain4j 進行配置

    3. Data Layer
        * Graph DB: Neo4j 或其他 Graph DB 仍需進行選型, 已知 Neo4j 不適合擴容，但作為 MVP Scope，我們可以使用 Neo4j 作為 Graph DB
        * Vector DB: 需要進行選型，主要儲存知識庫文件與說明的向量資料。實作過程如有必要，請於架構會議討論。
        * Object Store: 多媒體資料或其他文件資料本體的儲存。

## 程式碼管理

    1. 使用 GitHub 管理程式碼
    2. 使用前後端分離的 repo 管理程式碼，前後端分別是各自的 MonoRepo
    3. 建立 CI/CD 環境，使用 GitHub Actions
    4. 使用 GitHub Pages 建立 Web 網站
    5. 需要有 readme.md 文件，說明整個專案的使用方法

## 容器組件關係

    架構會議討論，目前 Agent Backend 是否需要仍需討論，可以用 BFF 實作? 或是與 Ontology Kernel 合併 

    1. Agent Portal:運作在 Node.js 上面，使用 React 
    2. Agent Backend: 接收 Input Data ，並使用 LLM 模型與 Ontolgoy Data 進行分析，並將輸出結果回傳給前端，使用 Springboot+LangChain4j 
    3. Data Layer: Neo4j 使用 Docker 運作，儲存 Ontology 資料
    4. Ontology Kernel: 提供 Domain API 或 GrpahQL API，整合 LLM ，供 AI Agent 後臺使用，使用 Springboot + LangChain4j 
    5. Data Interface: 使用 Docker 運作，提供資料匯入與資料匯出的功能，可使用 Java or Python 實作

## Onotolgoy Schema 資料結構請參考相關文件，請實作 UserRole, User, Intent, Application, Function, WebPage, API 作為 MVP Scope 


## Portal 需要提供三種介面給不同的使用者

    1. Nomral User Interface: 使用者可以使用聊天的方式和 Agent 互動取得網址，並詢問使用者是否要開啟網頁
    2. Knowledge Expert Interface: 知識專家可以管理特定領域的 Ontology 資料
    3. Admin Interface: 管理員可以管理所有 Ontology 資料
    4. Portal 另外一個功能是兼具溝通功能，此功能類似 Teams ，所有的使用者都需要可以快速在 Agent 與 communication 兩個模式間切換。

## 容器說明
    1. Portal 畫面容器
    2. Data Import 容器
    3. AI Agent 容器 - 提供與 Agent Portal 互動的 SSE 通道
    4. Neo4j 容器 - 提供儲存 ontology 的 Graph DB ，此 DB 可以抽換
    5. Ontology 操作容器 - 提供 API 操作 Ontology 資料

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

### Data Interface 容器, 後端包含資料匯入容器，其規格如下:

        1. 使用 Springboot + LangChain4j + Ollama
        2. 使用 Docker 建立容器
        3. 可以使用 command line 命令讀取特定 csv 檔案，並使用 LangChain4j 將其轉換成 Ontology 資料，並儲存到 Neo4j 中。
        4. 資料介面須建立 interface ，雖然 MVP 只實作 CSV ，但需要保留彈性給不同資料來源使用和LLM模型使用，因此 Ontology 分析與資料存取必須是不同介面的實作，以保留擴充彈性。

### Agent Backend

        1. 後端需要以 Stream API 方式串接後端，讓 AI 的回覆可以盡快到達使用者端，避免 idle 時間過長。
        2. 後端需要有基本的 UI 設計，可以讓使用者可以快速的與 AI Agent 互動。
        3. 接收使用者的對話，並使用 LLM 模型進行對話，查找 Neo4j 資料庫中的 Ontology 資料，並回覆使用者。
        4. 需要做嚴格的回覆判斷，對 Ontology 沒有定義的答案，需要回答不確定與不知道，降低 embedding 模糊比對的誤判率。
        5. 回覆內容需要實作過濾機制，MVP 中只有實作空白過濾，印出 Log 即可，不需實作。

### Ontology Kernel

        1. 提供 API 操作 Ontology 資料
        2. 提供 GrpahQL API 操作 Ontology 資料
        3. 整合 LLM 模型，提供 Ontology 分析與資料存取的功能
        4. 整合 LLM 模型和 Graph 資料，提供智能分析的功能
        5. 提供資料匯入與資料匯出的功能