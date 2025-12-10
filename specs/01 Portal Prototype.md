# Portal Prototype
 本次實作只製作 Prototype ，供後續開發使用
## MVP Scope
    1. 將目前複雜的網址查找過程透過 Ontology 的方式集中放進圖形資料庫
    2. 使用 web 介面讓使用者可以使用聊天的方式和 Agent 互動取得網址，並詢問使用者是否要開啟網頁
    3. 使用 MCP 的方式在 Chrom 瀏覽器上開啟網頁
    4. 上方 APP 
## 使用架構:
    1. 前端使用 React
    2. 後端使用 Springboot 與 LangChain4j 
    3. 資料庫使用 Neo4j 
    4. AI Agent 使用 OpenAI
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
```
## Portal 畫面設計，這個步驟只實作 Portotype，不實作後端串接部分

### 技術規格
    1. 前端使用 React 建立，運行在 Node.js 上面
    2. 使用  Ant Design，需要有 Dark mode and light mode ，切換模式功能作在使用者設定

### 畫面說明

    整體為響應式布局，整體畫面不會左右和上下捲動。
    1. Quick switch : 左上角是 communication 與 Agent 模式快速切換鈕。
    2. User icon: 右上角是使用者名稱，點擊使用者 ICON 可以快速進入使用者個人資料設定與系統設定，同時如果該使用者有多重身分，可以快速切換身分。(User Mode, Knowledge Expert Mode, Admin Mode), User icon 右下有小數字，顯示新訊息數量。
    3. Bookmark 列設計: 
       3.1 Bookmark 列: 位於上方，可以讓使用者釘選自己喜好的應用程式，這些應用程式左對齊，水平排列，以 icon 顯示，鼠標移上去會顯示系統名稱。
       3.1 Bookmark 列設定額外放在 bookmark_config.json 中，資料包含 url link, icon, name, description 
       3.2 Bookmark 列預設有: Lot Center (icon:wafer), Tool Center(icon:semiconductor tools), Process Center(icon:process), Knowledge Center(icon:book), Dashboard Center(icon:dashboard) ,url 一律先設定成 http://google.com。
       3.3 Bookmark 列的最右邊是加號 icon 給使用者新增應用程式，並且配備搜尋畫面，可以用傳統的名稱搜尋尋找應用程式。
       3.4 Bookmark 列的 + icon 按下後使用傳統功能樹結構，使用者可以選擇系統名稱，系統名稱下有功能樹，使用者可以選擇功能，功能下有應用程式，使用者可以選擇應用程式，在 Prototype 中，需要建立 data/func_tree.json 作為功能樹的資料。這個可以顯示 App1 , App1-function1, App1-function2, App2, App2-function1 這樣的假資料作為樹狀結構
    4. Portal 的中央主要是與 Agent 的對談畫面，對話框在底下
    5. Agent Chat
        5.1 Agent chat input design 
            5.1.1 Agent chat input: 對話框在主畫面底下，為多行輸入框，預設為五行字元高度，數量不超過 1000 字元，無法 顯示時，只顯示最後五行，輸入框下方有發送鈕，發送鈕和 alt-enter 作快捷鍵連結，Enter 為換行。
            5.1.2 File upload: 對話框左下有上傳資料設計，可以選擇檔案上傳
            5.1.3 Agent Selector: 對話框右下有專家選擇設計 icon，可以選擇專家 Agent，專家有 Equipment expert, Process expert, manufacture expert, 與 General expert，其功能在於使用不同專家進行對話，而 General expert 有權限使用所有專家的功能，且要有能力依據語意將任務分派給不同的專家 Agent。
        5.2 Agent chat output design
            5.2.1 Agent chat output: 與 agent 的對話歷史顯示在主畫面正中，具備捲動鈕，上下捲動時，只捲動對話視窗，其餘畫面元素不捲動。
    6.Left panel: 
        6.1 Portal 的左側可以收合。
        6.2 Agent left panel: 需要有以下功能, 
            6.2.1 New Conversation: 發起新對話，放在最上方
            6.2.2 Pinned Conversation: 可以把特定對話釘選
            6.2.3 My Expert: 可以設定自己的專家，自己的專家主要是可以把特定 SOP 文件放進去，限制 AI 只能使用特定的知識範圍，避免錯誤。
            6.2.4 Conversation History: 對談紀錄，按照由近而遠的日期排列，點擊可以重新對談，對談紀錄下方可以搜尋對談紀錄。
            6.2.5 Agent Left panel 的測試資料請放在 data/test_agent_left_panel.json
        6.3 Communication Left panel:每個頻道都有與頻道群組都有新訊息的數字，以利找到新訊息。
            6.3.1 New Chat function: 發起新對話
            6.3.2 Recent Chat list: 最近的對話紀錄
            6.3.3 Group Chat Channel list: 群組對話紀錄
            6.3.4 Direct Message channel list: 直接訊息紀錄
            6.3.5 Bot Chat channel list: 由系統發出給使用者的訊息，主要用於系統通知
            6.3.6 Communication Left panel 的測試資料請放在 data/test_communication_left_panel.json
    7. Agent Chat Reply test data and data format
        7.1 Agent Chat Reply Data format: 使用 JSON 格式，包含 sequence, userMessage, agentReply, action recommended
        7.2 action recommended: 包含 action type, action parameters，用於呼叫 MCP server，以開啟網頁，目前只有 open_url 一個 action type
        7.3 action type 以按鈕顯示在 Agent Chat Reply 中，使用者可以點擊按鈕來執行 action
        7.4 Agent Chat Reply test data: 使用 JSON 格式，另外存在 test_agent_chat_reply.json，用於測試 Agent Chat Reply
    8. MVP 只實作 Agent 模式的實際串接，聊天模式只有基本的 UI 設計，沒有實際功能。

## 此步驟只有設計可運作的 UI，後端 API 以及資料庫設計請在後續步驟中完成

## 整個 Prototype 的建立動作需要反覆與我確認，並進行修改，直到完成為止