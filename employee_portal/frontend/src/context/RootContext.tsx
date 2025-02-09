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
  updateEmployee: () => void;
  deleteEmployee: () => void;
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

  // Update employee (placeholder)
  const updateEmployee = () => {
    // TODO: Replace with UPDATE API
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

  // Delete employee (placeholder)
  const deleteEmployee = () => {
    // TODO: Replace with DELETE API
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
        action: undefined
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
        updateEmployee,
        deleteEmployee,
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