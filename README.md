# Mini_Page_Builder
 Almabase Frontend Inten Assignment
 
The Mini Page Builder a tool for creating pages without needing to write a bunch of code, offering a user-centric approach to page creation. By leveraging intuitive drag-and-drop functionality and customizable elements, users can easily assemble and customize their pages with minimal effort.

Key Features:-

1. **Drag-and-Drop Interface:** Intuitive drag-and-drop functionality allows users to effortlessly add elements to their web pages from a sidebar menu.
2. **Customizable Elements:** Each element can be fully customized through an interactive configuration modal, enabling users to adjust properties such as size, color, and position.
3. **Editing and Deletion**: Users can easily edit or delete elements on the page, providing flexibility and control over the layout and design.
4. **Automatic Local Storage Saving**: All changes made by the user are automatically saved to local storage, ensuring data persistence and minimizing the risk of data loss.
5. **Export Functionality (Optional):** Users have the ability to export the current page configuration to a JSON file, facilitating easy sharing and backup of page layouts.
6. **Responsive Design (Optional):** The Mini Page Builder is designed to be responsive, ensuring a seamless experience across various devices and screen sizes.

Components:

1. **App Component:** This is the main component of the application. It serves as the container for other components and manages the overall state of the application.
2. **Sidebar Component:** The Sidebar component contains the draggable elements (e.g., Label, Input, Button) that users can add to the page. It handles the drag-and-drop functionality.
3. **Page Component:** This component represents the blank page where users can add and arrange elements. It also manages the state of the elements on the page.
4. **Element Component**: Each draggable element on the page (e.g., Label, Input, Button) is represented by an Element component. This component stores information about the element's type, position, and configuration.
5. **Modal Component**: The Modal component is used to display configuration options when users add or edit elements on the page.

## Instructions for Running the Code

### **Prerequisites:**

- Node.js and npm (Node Package Manager) are installed on your computer.

### **Installation Steps:**

1. **Clone the Repository:**
    - Open your terminal or command prompt.
    - Navigate to the directory where you want to clone the repository.
    - Run the following command:
        
        git clone <https://github.com/LavanyaG23/Mini_Page_Builder>
        
2. **Navigate to the Project Directory:**
    - Use the **`cd`** command to navigate into the directory of the cloned repository:
        
        cd mini-page-builder
        
3. **Install Dependencies:**
    - Once inside the project directory, install the necessary dependencies by running:
        
        npm install
        

### **Running the Application:**

1. **Start the Development Server:**This command will start the server and automatically open the Mini Page Builder in your default web browser.
    - After installing the dependencies, start the development server by running:
        
        npm run dev
        

### **Using the Application:**

1. **Using the Mini Page Builder:**
    - Once the application is running, you'll see the Mini Page Builder interface.
    - On the sidebar, you'll find draggable components like Label, Input, and Button.
    - Drag these components onto the blank page to start building your web page.
    - When you drop a component onto the page, a modal will appear for configuring its properties such as size, color, and text content.
    - You can edit or delete elements on the page by clicking on them and pressing the enter key for editing or the delete key for deletion.
    - All changes made to the page, including additions, edits, and deletions, are automatically saved to local storage.

### **Stopping the Application:**
    - To stop the development server, go back to your terminal or command prompt and press **`Ctrl + C`**.
    - You'll be prompted to confirm whether you want to terminate the process. Type **`Y`** and press **`Enter`** to 
    ![Mini_page_builder_ss](https://github.com/LavanyaG23/Mini_Page_Builder/assets/92771328/144ce106-fb68-468e-a908-a870c3bada0f)
confirm.

