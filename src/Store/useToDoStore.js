import { create } from "zustand";
import { persist } from "zustand/middleware";

const useToDoStore = create(
  persist(
    (set) => ({
      tasks: [],
      setTasks: (tasks) => set({ tasks }),
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      deleteTask: (type, objIds) =>
        set((state) => ({
          tasks:
            type === "task"
              ? state.tasks.filter((item, index) => item.id != objIds.id)
              : state.tasks?.map((item, index) =>
                  item.id === objIds.id
                    ? {
                        ...item,
                        subTask: item.subTask.filter(
                          (_, i) => i != objIds.subId,
                        ),
                      }
                    : item,
                ),
        })),
      addSubTask: (index, data) =>
        set((state) => ({
          tasks: state.tasks.map((item, i) =>
            item.id === index
              ? { ...item, subTask: [...(item.subTask ?? []), data] }
              : item,
          ),
        })),
      editTask: (type, objIds, data) =>
        set((state) => ({
          tasks: state.tasks.map((item, index) =>
            item.id === objIds.id
              ? type === "task"
                ? { ...item, titleTask: data.title, descTask: data.desc }
                : {
                    ...item,
                    subTask: item.subTask.map((sub, i) =>
                      i === objIds.subId
                        ? { ...sub, title: data.title, desc: data.desc }
                        : sub,
                    ),
                  }
              : item,
          ),
        })),
        toggleChecked:(checked, type, objIds)=>set((state)=>({tasks:state.tasks.map(item=>item.id==objIds.id?type === "task"?{...item,checkStatus:checked}:{...item,subTask:item.subTask.map((sub,i)=>i===objIds.subId?{...sub,checkStatus:checked}:sub)}:item)}))
    }),
    { name: "toDo-storage" },
  ),
);
export default useToDoStore;
