import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      titleCard: "TO DO LIST",
      manageTasks: "Manage your tasks efficiently and stay productive.",
      addTask: "Add Task",
      taskTitle: "Task Title",
      taskDescription: "Task Description",
      all: "All",
      completed: "Completed",
      uncompleted: "UnCompleted",
      noTasks: "No Tasks",
      required: "Required",
      editTask: "Edit Task",
      editSubTask: "Edit SubTask",
      addSubTask: "Add New SubTask",
      save: "Save",
      close: "Close",
      title:"Title",
      desc:"Description",
      task:"Task",
      sub:"SubTask",
      subTaskBtn:"Add Subtask",
      updateTask:"Updated Successfully!",
      deleteTask:"Deleted Successfully!",
      confirmAddTask:"Added Task Successfully!",
      confirmAddSubTask:"Added SubTask Successfully!",
      
    }
  },

  ar: {
    translation: {
      titleCard: "قائمة المهام",
        manageTasks: "نظّم مهامك بسهولة وحافظ على إنتاجيتك.",
      addTask: "إضافة مهمة",
      taskTitle: "عنوان المهمة",
      taskDescription: "وصف المهمة",
      all: "الكل",
      completed: "مكتملة",
      uncompleted: "غير مكتملة",
      noTasks: "لا توجد مهام",
      required: "هذا الحقل مطلوب",
      editTask:"تعديل المهمة",
      editSubTask:"تعديل المهمة الفرعية",
      addSubTask:"إضافة مهمة فرعية جديدة",
      save: "حفظ",
      close: "اغلاق",
      title:"عنوان",
      desc:"وصف",
      task:"المهمة",
      sub:"مهمة فرعية",
      subTaskBtn:"إضافة مهمة فرعية",
      updateTask:"تم التحديث بنجاح!",
      deleteTask:"تم الحذف بنجاح!",
      confirmAddTask:"تمت إضافة المهمة بنجاح!",
      confirmAddSubTask:"تمت إضافة المهمة الفرعية بنجاح!",
    }
  }
};

i18n
.use(initReactI18next)
.init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;