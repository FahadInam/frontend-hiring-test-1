import apiHandler from "../../utils/apiHandler";
import { formatDate } from "../../utils/formatDate";

// Api to fetch all calls
export const fetchCalls = async (offset, limit) => {
  try {
    const response = await apiHandler("getCalls", { offset, limit });
    const { nodes, totalCount } = response;

    // Format data for the table
    const formattedData = nodes.map((call) => ({
      key: call.id,
      callType: call.call_type,
      durationInMinutes: `${Math.floor(call.duration / 60)} minutes ${
        call.duration % 60
      } seconds`,
      durationInSeconds: `(${call.duration} seconds)`,
      direction: call.direction,
      from: call.from,
      to: call.to,
      via: call.via,
      createdAt: formatDate(new Date(call.created_at)),
      status: call.is_archived ? "Archived" : "Unarchived",
    }));

    return { formattedData, totalCount };
  } catch (error) {
    console.error("Error fetching calls:", error);
    throw error;
  }
};

// Api to fetch single calls

export const fetchSingleCall = async (id) => {
  try {
    const call = await apiHandler("getSingleCall", { id });
    return {
      id: call.id,
      callType: call.call_type,
      durationInMinutes: `${Math.floor(call.duration / 60)} minutes ${
        call.duration % 60
      } seconds`,
      from: call.from,
      to: call.to,
      via: call.via,
    };
  } catch (error) {
    console.error("Error fetching single call:", error);
    throw error;
  }
};

// Update call status
export const updateCallStatus = async (id) => {
  try {
    const response = await apiHandler("updateStatus", { id });
    return response;
  } catch (error) {
    console.error("Error updating call status:", error);
    throw error;
  }
};

export const getCallTypeColor = (callType) => {
  if (callType.toLowerCase() === "missed") {
    return "#d54d67";
  } else if (callType.toLowerCase() === "answered") {
    return "#54d6c9";
  } else if (callType.toLowerCase() === "voicemail") {
    return "#3a60e8";
  }
  return "#000";
};

export const showTotalSummary = (currentPage, pageSize, total) => {
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, total);
  return `${start} - ${end} of ${total} results`;
};
