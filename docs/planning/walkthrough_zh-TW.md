# Agent Portal Prototype - Ant Design 實作

我已經成功將 Agent Portal 原型重構為使用 **Ant Design**，增加了對深色/淺色模式、JSON 驅動配置以及增強型聊天介面的支援。

## 主要功能實作

### 1. Ant Design 基礎建設
- **Theme Provider**：封裝應用程式以支援動態深色/淺色模式切換。
- **全域重置 (Global Reset)**：清理了舊有的 CSS，以充分利用 Ant Design 的樣式 Token。

### 2. 標頭 (TopBar)
- **快速切換器 (Quick Switcher)**：在「Agent」和「Communication」模式之間切換。
- **書籤列 (Bookmark Bar)**：從 `bookmark_config.json` 載入資料。
- **使用者個人資料 (User Profile)**：包含角色切換 (User/Expert/Admin) 和主題切換的下拉選單。
- **功能樹選擇器**：新增視窗支援以樹狀結構選取並新增 App 至書籤。

### 3. 側邊欄 (左側面板)
- **模式感知內容 (Mode-Aware Content)**：
    - **Agent 模式**：「新對話」按鈕、釘選對話、我的專家和歷史記錄 (含時間戳記)。
    - **Comm 模式**：「頻道」和帶有通知徽章的「直接訊息」。
- **Ant Sider**：具有整合選單的可收折側邊欄。

### 4. 聊天介面
- **訊息渲染 (Message Rendering)**：使用 `Ant List` 和 `Card` 以不同樣式顯示使用者與 Agent 的訊息。
- **豐富輸入區域 (Rich Input Area)**：
    - **檔案上傳**按鈕。
    - **專家選擇器**下拉選單 (General, Equipment, Process 等)。
    - **豐富輸入**：固定高度多行文字框 (5 行)。
    - **快捷鍵**：`Alt + Enter` 發送，`Enter` 換行。
    - **限制**：最大 1000 字元。
    - **動作按鈕**：推薦動作以主要按鈕形式呈現。
- **捲動優化**：優化版面配置，確保僅訊息列表捲動，輸入框固定於底部。
- **自訂圖標**：
    - 將書籤列的預設圖標替換為每個「中心」的專屬圖片資源。

## 驗證

應用程式正在 `http://localhost:3000` 上運行。

### 視覺驗證
使用者介面現在呈現 Ant Design 的簡潔、專業外觀，且載入正確無錯誤。

![Ant Design UI Verification](file:///C:/Users/chenl/.gemini/antigravity/brain/a742a398-2cd9-4dd6-9d4d-d894ba256dac/port_3000_retry_1765104246118.png)

![Function Tree Modal](file:///C:/Users/chenl/.gemini/antigravity/brain/a742a398-2cd9-4dd6-9d4d-d894ba256dac/add_app_modal_tree_interaction_1765109176790.png)
*(註：Modal 顯示功能樹結構，可勾選 App)*

![Chat Scrolling](file:///C:/Users/chenl/.gemini/antigravity/brain/a742a398-2cd9-4dd6-9d4d-d894ba256dac/fixed_header_long_scroll_1765109435409.png)
*(註：已修正全域捲動問題)*

## 下一步
- 實作真實的後端 API 連接 (Spring Boot)。
- 將「開啟 URL」動作連接到實際的 MCP 呼叫。
