import React, { useEffect, useState, useCallback } from "react";
import { Table } from "antd";
import apiHandler from "../utils/apiHandler";
import AddNoteModal from "../components/Calls/AddNoteModal";
import { toast } from "react-toastify";
import FilterSelect from "../UI/FilterSelect";
import usePusher from "../realtime/usePusher";
import {
  fetchCalls,
  fetchSingleCall,
  updateCallStatus,
  getCallTypeColor,
  showTotalSummary,
} from "../components/Calls/actions";
import { CALL_STATUSES, FILTER_OPTIONS } from "../constants/constants";
import { getCallColumns } from "../components/Calls/columns";

const Call = () => {
  const [callsData, setCallsData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCall, setSelectedCall] = useState(null);
  const [filters, setFilters] = useState({ status: "All", callType: "All" });
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [allCallsData, setAllCallsData] = useState([]);

  // Fetch calls data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const offset = (pagination.current - 1) * pagination.pageSize;
      const { formattedData, totalCount } = await fetchCalls(
        offset,
        pagination.pageSize
      );
      setAllCallsData(formattedData);
      setCallsData(formattedData);
      setTotalCount(totalCount);
      setLoading(false);
    };
    fetchData();
  }, [pagination]);

  // Handle real-time call updates
  const handlePusherUpdate = useCallback((data) => {
    setCallsData((prevData) =>
      prevData.map((call) =>
        call.key === data.id
          ? { ...call, status: data.is_archived ? "Archived" : "Unarchived" }
          : call
      )
    );
  }, []);

  // Setup Pusher
  usePusher("private-aircall", "update-call", handlePusherUpdate);

  // Handle table changes (pagination)
  const handleTableChange = useCallback((pagination) => {
    setPagination(pagination);
  }, []);

  // Open modal for adding note
  const handleAddNote = useCallback(async (record) => {
    const selectedCall = await fetchSingleCall(record.key);
    setSelectedCall(selectedCall);
    setIsModalVisible(true);
  }, []);

  // Handle saving a note
  const handleSave = useCallback(async (id, note) => {
    const response = await apiHandler("addNote", { id, content: note });
    if (response) toast.success("Note Saved!");
    setIsModalVisible(false);
  }, []);

  // Handle status click to update status
  const handleStatusClick = useCallback(async (record) => {
    const response = await updateCallStatus(record.key);
    if (response) {
      toast.success("Status Updated!");
    }
  }, []);

  // Handle filter changes
  const handleFilterChange = useCallback(
    (filterType, value) => {
      const updatedFilters = { ...filters, [filterType]: value };
      setFilters(updatedFilters);

      // Filter the full dataset
      let filteredData = allCallsData;

      // Filter by status
      if (updatedFilters.status !== "All") {
        filteredData = filteredData.filter(
          (call) =>
            call.status === CALL_STATUSES[updatedFilters.status.toUpperCase()]
        );
      }

      // Filter by call type
      if (updatedFilters.callType !== "All") {
        filteredData = filteredData.filter(
          (call) =>
            call.callType.toLowerCase() ===
            updatedFilters.callType.toLowerCase()
        );
      }

      setCallsData(filteredData);
    },
    [allCallsData, filters]
  );

  return (
    <div className="call-container">
      <h2 className="mb-9 calls-title">Turing Technologies Frontend Test</h2>
      <div style={{ marginBottom: 16 }}>
        <span>Filter by: </span>

        <FilterSelect
          filterType="status"
          defaultValue="Status"
          options={FILTER_OPTIONS.STATUS}
          onChange={handleFilterChange}
        />

        <span>Filter by: </span>

        <FilterSelect
          filterType="callType"
          defaultValue="Call Type"
          options={FILTER_OPTIONS.CALL_TYPE}
          onChange={handleFilterChange}
        />
      </div>

      <Table
        columns={getCallColumns(handleAddNote, handleStatusClick)}
        dataSource={callsData}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: totalCount,
          position: ["bottomCenter"],
        }}
        loading={loading}
        onChange={handleTableChange}
      />

      <AddNoteModal
        isModalVisible={isModalVisible}
        callData={selectedCall}
        handleCancel={() => setIsModalVisible(false)}
        handleSave={handleSave}
      />

      <div style={{ marginTop: "10px", textAlign: "center", fontSize: "14px" }}>
        {showTotalSummary(pagination.current, pagination.pageSize, totalCount)}
      </div>
    </div>
  );
};

export default Call;
