export const PUSHER_CONFIG = {
  appKey: "d44e3d910d38a928e0be",
  cluster: "eu",
  authEndpoint: "https://frontend-test-api.aircall.dev/pusher/auth",
};

export const CALL_STATUSES = {
  ARCHIVED: "Archived",
  UNARCHIVED: "Unarchived",
};

//  options for statuses and call types
export const FILTER_OPTIONS = {
  STATUS: [
    { value: "All", label: "All" },
    { value: "Archived", label: "Archived" },
    { value: "Unarchived", label: "Unarchived" },
  ],
  CALL_TYPE: [
    { value: "All", label: "All" },
    { value: "missed", label: "Missed" },
    { value: "voicemail", label: "Voicemail" },
    { value: "answered", label: "Answered" },
  ],
};
