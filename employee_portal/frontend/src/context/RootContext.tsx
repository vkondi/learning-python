import axios from "axios";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

// Employee data structure
export interface EmployeeType {
  address: string;
  designation: string;
  email: string;
  emp_dob: string;
  emp_name: string;
  id: number;
  emp_id: number;
  phone: string;
  salary: number;
}

// Popup action types
type EmpPopupActionType = "add" | "edit" | "delete" | undefined;

// Popup state structure
interface EmpPopupType {
  open: boolean;
  data: EmployeeType | undefined;
  action?: EmpPopupActionType;
}

// Context state and actions
interface RootContextType {
  loading: boolean;
  employees: EmployeeType[];
  fetchEmployees: () => void;
  addEmployee: (data: EmployeeType) => Promise<any>;
  updateEmployee: (data: EmployeeType) => Promise<any>;
  deleteEmployee: (emp_id: EmployeeType["emp_id"]) => Promise<any>;
  generateRandomEmployee: () => Promise<EmployeeType | undefined>;
  showEmpPopup: boolean;
  empPopupData: EmployeeType | undefined;
  empPopupAction: EmpPopupActionType;
  setEmpPopup: Dispatch<SetStateAction<EmpPopupType>>;
  setShowEmpPopup: (val: boolean) => void;
  setEmpPopupData: (data: EmployeeType) => void;
  setEmpPopupAction: (action: EmpPopupActionType) => void;
}

// Create context
const RootContext = createContext<RootContextType | undefined>(undefined);

import { ReactNode } from "react";

// Context provider
export const RootProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const [empPopup, setEmpPopup] = useState<EmpPopupType>({
    open: false,
    data: undefined,
    action: undefined,
  });

  // Fetch employees
  const fetchEmployees = () => {
    setLoading(true);
    axios
      .get("/api/get-all-employees")
      .then((response) => {
        setEmployees(response?.data ?? []);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Add Employee API Call
  const addEmployee = (data: EmployeeType) => {
    return axios
      .post("/api/add-employee", {
        address: data?.address,
        designation: data?.designation,
        email: data?.email,
        emp_dob: data?.emp_dob,
        emp_name: data?.emp_name,
        phone: data?.phone,
        salary: data?.salary,
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Update employee API
  const updateEmployee = (data: EmployeeType) => {
    return axios
      .put(`/api/update-employee/${data?.emp_id}`, {
        address: data?.address,
        designation: data?.designation,
        email: data?.email,
        emp_dob: data?.emp_dob,
        emp_name: data?.emp_name,
        phone: data?.phone,
        salary: data?.salary,
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Delete employee API
  const deleteEmployee = (emp_id: EmployeeType["id"]) => {
    return axios
      .delete(`/api/delete-employee/${emp_id}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Generate Random Employee API
  const generateRandomEmployee = () => {
    setLoading(true);

    return axios
      .get("/api/generate-random-employee")
      .then((response) => {
        return response?.data?.data;
      })
      .catch((error) => {
        console.log("generateRandomEmployee >> error: ", error);
        return undefined;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Show/hide popup
  const setShowEmpPopup = (value: boolean) => {
    if (value) {
      setEmpPopup((prevEmpPopup) => ({
        ...prevEmpPopup,
        open: value,
      }));
    } else {
      // Reset data on hide
      setEmpPopup({
        open: value,
        data: undefined,
        action: undefined,
      });
    }
  };

  // Set popup data
  const setEmpPopupData = (data1: EmployeeType) => {
    setEmpPopup((prevEmpPopup) => ({
      ...prevEmpPopup,
      data: data1,
    }));
  };

  // Set popup action
  const setEmpPopupAction = (action1: EmpPopupActionType) => {
    setEmpPopup((prevEmpPopup) => ({
      ...prevEmpPopup,
      action: action1,
    }));
  };

  // Fetch employees on mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <RootContext.Provider
      value={{
        loading,
        employees,
        fetchEmployees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        generateRandomEmployee,
        showEmpPopup: empPopup.open,
        empPopupData: empPopup.data,
        empPopupAction: empPopup.action,
        setShowEmpPopup,
        setEmpPopupData,
        setEmpPopupAction,
        setEmpPopup,
      }}
    >
      {children}
    </RootContext.Provider>
  );
};

// Custom hook to use context
export const useRootContext = () => {
  const context = useContext(RootContext);
  if (!context) {
    throw new Error("useRootContext must be used within a RootProvider");
  }
  return context;
};
