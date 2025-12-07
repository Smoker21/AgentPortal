# Agent Portal Prototype - Implementation Plan (v2)

## Goal Description
Re-implement the Agent Portal UI using **React + Ant Design**. The goal is to create a high-fidelity prototype that supports:
- **Dark/Light Mode** switching.
- **Configurable Bookmark Bar** (loaded from JSON).
- **Dual-Mode Sidebar** (Agent vs. Communication) with expanded features.
- **Enhanced Chat Interface** with file upload, expert selection, and structured message formats.

## User Review Required
> [!IMPORTANT]
> This implementation will completely replace the previous CSS-based styling with Ant Design components.
> The "Communication Mode" channel lists will be mock-ups with notification badges as requested.
> Bookmarks and Chat responses will be driven by static JSON files for this prototype.

## Proposed Changes

### Infrastructure
#### [NEW] [package.json](file:///d:/workspace/agent_portal/src/portal/package.json)
- Add `antd` and `@ant-design/icons` dependencies.

#### [NEW] [Context Providers](file:///d:/workspace/agent_portal/src/portal/src/context/ThemeContext.jsx)
- Implement a Theme Provider to manage Dark/Light mode state.

### Configuration Data
#### [NEW] [bookmark_config.json](file:///d:/workspace/agent_portal/src/portal/src/data/bookmark_config.json)
- Define the structure for bookmarks (Lot Center, Tool Center, etc.) and their hierarchy.

#### [NEW] [func_tree.json](file:///d:/workspace/agent_portal/src/portal/src/data/func_tree.json)
- Define the function tree structure (System -> Function -> App).
- Example: `App1`, `App1-function1`, `App1-function2`.

#### [NEW] [test_agent_chat_reply.json](file:///d:/workspace/agent_portal/src/portal/src/data/test_agent_chat_reply.json)
- Define test data for chat interactions, including `action recommended`.

### Component Architecture

#### [MODIFY] [MainLayout.jsx](file:///d:/workspace/agent_portal/src/portal/src/components/Layout/MainLayout.jsx)
- Switch to `Ant Layout` (Sider, Header, Content).
- Manage global state: `mode`, `userRole`, `selectedExpert`.

#### [MODIFY] [Header.jsx](file:///d:/workspace/agent_portal/src/portal/src/components/Create/Header.jsx)
- Refactor to use Ant Design `Header` and `Menu` components.
- Implement "Quick Switch" for Agent/Comm modes.
- Implement **Bookmark Bar** using the JSON config.
- **Add App Feature**:
  - Implement `+` button triggering a Modal or Drawer.
  - Render `Tree` component using data from `func_tree.json`.
  - Allow selection of leaf nodes (Apps) to add to bookmarks (mock add).
- Implement **User Profile** dropdown with role switcher and notification badge.

#### [MODIFY] [Sidebar.jsx](file:///d:/workspace/agent_portal/src/portal/src/components/Sidebar/Sidebar.jsx)
- **Agent Mode**:
  - "New Conversation" button (top).
  - "Pinned Conversations" list.
  - "My Expert" section.
  - "Conversation History" (date grouped).
- **Comm Mode**:
  - `Badge` components for unread counts on Channels/DMs.

#### [MODIFY] [ChatInterface.jsx](file:///d:/workspace/agent_portal/src/portal/src/features/Agent/ChatInterface.jsx)
- **Message List**: Render messages based on the schema (userMessage, agentReply, actions).
- **Input Area**:
  - **File Uploader** (bottom-left).
  - **Expert Selector** (bottom-right) using Ant `Select` or `Dropdown`.
- **Scrolling Behavior**:
  - Messages container takes available height using `flex: 1`.
  - Only messages container scrolls (`overflow-y: auto`).
  - Input area fixed at bottom of column, not viewport.

## Verification Plan
1. **Infrastructure**: Verify `npm install` and app start without errors.
2. **Ant Design**: Check visual styling (Dark/Light mode toggle).
3. **Data Loading**: Confirm bookmarks appear from JSON and chat loads test data.
4. **Interactions**:
   - Test "Quick Switch" toggles sidebar content.
   - Test "Add App" menu hierarchy.
   - Test Expert Selection updates chat context.
