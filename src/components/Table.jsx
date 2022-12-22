import React, { useState } from 'react'
// import Filter from './Filter'
import styles from "./table.css"
import {
    createTable,
    useTableInstance,
    getCoreRowModel,
  } from "@tanstack/react-table";

  import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Text,
  } from '@chakra-ui/react'
  import { defaultColumns } from './DefaultColumn'
  import STUDENTS from "./students.json";
  const defaultData = [...STUDENTS];
  const table = createTable();

  const Table = () => {

    const [data, setData] = useState([...defaultData.slice(0, 15)]);
  const [columns, setColumns] = useState([...defaultColumns]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure()


  const instance = useTableInstance(table, {
    data,
    columns,
     columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility: columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
  });
  console.log(instance.getState().columnResizeMode);

  return (
    <div>
   
   <>
        <Button bg={"#03a9f4"} onClick={onOpen}>Filter Data</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Select Headers</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <div className="input-group">
        {" "}
        <label>
          <input
            type="checkbox"
            checked={instance.getIsAllColumnsVisible()}
            onChange={instance.getToggleAllColumnsVisibilityHandler()}
          />
          Toggle All
        </label>
        {instance.getAllLeafColumns().map((column) => (
          <label key={column.id}>
            <input
              type="checkbox"
              checked={column.getIsVisible()}
              onChange={column.getToggleVisibilityHandler()}
            />
            {column.id}
          </label>
        ))}
      </div>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              {/* <Button variant='ghost'>Secondary Action</Button> */}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>


   <div>
    <Text as="b" size={"8xl"}>STUDENTS DATA</Text>
      <table border={1}  style={{ width: instance.getTotalSize(), margin:"auto" }}>
        <thead>
          {instance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan} style={{ width: header.getSize() }}>
                  {header.isPlaceholder ? null : header.renderHeader()}
              
                  <div
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    className={`resizer ${
                      header.column.getIsResizing() ? 'isResizing' : null
                    }`}
                    style={{
                      transform: header.column.getIsResizing()
                        ? `translateX(${
                            instance.getState().columnSizingInfo.deltaOffset
                          }px)`
                        : '',
                    }}
                  ></div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {instance.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{cell.renderCell()}</td>
              ))}
            </tr>
          ))}
        </tbody>
    
      </table>
    </div>
    </div>
  )
}

export default Table