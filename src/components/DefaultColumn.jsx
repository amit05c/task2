import {
    createTable,
    useTableInstance,
    getCoreRowModel,
  } from "@tanstack/react-table";
  const table = createTable();
export const defaultColumns = [
  

    table.createDataColumn("firstName", {
      id: "First Name",
    }),
  
    table.createDataColumn("middleName", {
      id: "Middle Name",
    }),
  
    table.createDataColumn("lastName", {
      id: "Last Name",
    }),
  
    
  
    table.createDataColumn("age", {
      id: "Age",
    }),
  
    table.createDataColumn((row) => row.phone[1], {
      id: "Phone Number",
    }),
  
   
  
    table.createDataColumn("email", {
      id: "E-mail Address",
    }),
  
  ];