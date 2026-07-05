import { Button, Switch, useDisclosure } from "@heroui/react";
import React, { useEffect, useMemo, useState } from "react";
import ADDSUBTASK from "../Comonent/ADDSUBTASK";
import toast from "react-hot-toast";
import useToDoStore from "../Store/useToDoStore";
import TaskCard from "../Comonent/TaskCard";


function Home() {
  
const {
  con,
  addTaskCon,
  deleteTaskCon,
  addSubTaskCon,
  editTaskCon,
  toggleChecked,
} = useToDoStore((state) => ({
  con: state.tasks,
  addTaskCon: state.addTask,
  deleteTaskCon: state.deleteTask,
  addSubTaskCon: state.addSubTask,
  editTaskCon: state.editTask,
  toggleChecked: state.toggleChecked,
}));

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [cHeck, setCHeck] = useState(1);
  const filterData = useMemo(() => {
    if (cHeck === 1) return con;
    if (cHeck === 2) return con.filter((item) => !item.checkStatus);
    return con.filter((item) => item.checkStatus);
  }, [con, cHeck]);

  const [inputTitle, setInputTitle] = useState("");
  const [inputTitleMessage, setInputTitleMessage] = useState("");
  const [inputDesc, setInputDesc] = useState("");
  const [inputDescMes, setInputDescMess] = useState("");
  ///////////////////////////////////////////////////////////
  const [selectedData, setSelectedData] = useState(null);
  const [inputModal, setInputModal] = useState("");
  const [inputModalMessage, setInputModalMessage] = useState("");
  const [inputModalDesc, setInputModalDesc] = useState("");
  const [inputModalDescMes, setInputModalDescMess] = useState("");
  const [conditionId, setConditionId] = useState("");
  useEffect(() => {
    if (!isOpen) {
      setConditionId("");
      clearInputs();
    }
  }, [isOpen]);

  function checkedTaskCompleted(checked, type, objIds) {
    toggleChecked(checked, type, objIds);
  }

  function changeStyle(x) {
    setCHeck(x);
  }

  function AddTask() {
    if (inputTitle.trim().length == 0) {
      setInputTitleMessage("Required");
      return;
    } else {
      setInputTitleMessage("");
    }
    if (inputDesc.trim().length == 0) {
      setInputDescMess("Required");
      return;
    } else {
      setInputDescMess("");
    }
    const date = nanoid();
    const Day = date.toLocaleTimeString();
    const data = {
      id: Date.now(),
      titleTask: inputTitle,
      date: `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} - ${Day}`,
      descTask: inputDesc,
      checkStatus: false,
    };

    addTaskCon(data);
    setInputTitle("");
    setInputDesc("");
    toast.success("Added Task Successfully!");
  }

  function clearInputs() {
    setInputModalMessage("");
    setInputModalDescMess("");
    setInputModal("");
    setInputModalDesc("");
    onClose();
  }

  function AddSubTask(index) {
    if (inputModal.trim().length == 0) {
      setInputModalMessage("Required");
      return;
    } else {
      setInputModalMessage("");
    }
    if (inputModalDesc.trim().length == 0) {
      setInputModalDescMess("Required");
      return;
    } else {
      setInputModalDescMess("");
    }

    addSubTaskCon(index, {
      title: inputModal,
      desc: inputModalDesc,
      checkStatus: false,
    });
    clearInputs();
    toast.success("Added SubTask Successfully!");
  }

  function DeleteTask(type, objIds) {
    deleteTaskCon(type, objIds);
    toast.error("Deleted Successfully!");
  }
  function editTask(type, objIds) {
    if (type === "task") {
      setInputModal(con[objIds.id].titleTask);
      setInputModalDesc(con[objIds.id].descTask);
    } else {
      setInputModal(con[objIds.id].subTask[objIds.subId].title);
      setInputModalDesc(con[objIds.id].subTask[objIds.subId].desc);
    }

    setConditionId(type);
    onOpen();
  }
  function saveEdit(arr) {
    let [type,objIds] = arr;

    let data = { title: inputModal, desc: inputModalDesc };

    editTaskCon(type, objIds, data);
    clearInputs();
    setConditionId("");
    toast.success("Updated Successfully!");
  }

  return (
    <div className="container w-1/2 ">
      <div className=" rounded-2xl border shadow border-gray-200 flex flex-col gap-4 p-5 mt-4">
        <h1 className="text-center text-6xl font-bold my-2">TO DO LIST</h1>
        <input
          type="text"
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
          placeholder="Task Title"
          className="outline-0 border-2 border-gray-100 p-2 py-3 focus:border-3 focus:border-gray-300 rounded-xl"
        />
        {inputTitleMessage && (
          <p className="text-sm text-red-500 -mt-3 ms-2">{inputTitleMessage}</p>
        )}
        <textarea
          placeholder="Task Description"
          onChange={(e) => setInputDesc(e.target.value)}
          value={inputDesc}
          className="outline-0 border-2 border-gray-100 p-2 py-3 focus:border-3 focus:border-gray-300 rounded-xl"
        ></textarea>
        {inputDescMes && (
          <p className="text-sm text-red-500 -mt-3 ms-2">{inputDescMes}</p>
        )}
        <Button color="primary" className="w-fit" onClick={AddTask}>
          Add Task
        </Button>
      </div>

      {/* ////////////////////////////////////////////////////////////////////////// */}
      <div className="flex gap-4 my-4">
        {["All", "UnCompleted", "Completed"].map((item, index) => (
          <button
            key={item}
            onClick={() => changeStyle(index + 1)}
            className={`border border-blue-500 ${cHeck == index + 1 ? "bg-blue-500 text-white" : "bg-white text-blue-500"} p-2 px-4 rounded-xl hover:bg-blue-500 hover:text-white cursor-pointer`}
          >
            {item}
          </button>
        ))}
      </div>
      {/* ///////////////////////////////////////////////////////////////////////////// */}
      <div className="flex flex-col gap-4 ">
        {filterData.length !== 0 ? (
          filterData?.map((item, index) => (
            <TaskCard item={item} key={item.id} />
          ))
        ) : (
          <p className="h-1/2 flex items-center justify-center capitalize font-bold text-2xl">
            no tasks
          </p>
        )}

        {isOpen && (
          <ADDSUBTASK
            index={selectedData}
            saveData={conditionId === "add" ? AddSubTask : saveEdit}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            title={conditionId === "task" ? "Task" : "SubTask"}
            header={
              conditionId === "task"
                ? "Edit Task"
                : conditionId === "sub"
                  ? "Edit SubTask"
                  : "Add New SubTask"
            }
            inputModal={inputModal}
            setInputModal={setInputModal}
            inputModalMessage={inputModalMessage}
            inputModalDesc={inputModalDesc}
            setInputModalDesc={setInputModalDesc}
            inputModalDescMes={inputModalDescMes}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
