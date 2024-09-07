import { useEffect } from "react";
import Pusher from "pusher-js";
import { getAuthToken } from "../actions/user.actions";
import { PUSHER_CONFIG } from "../constants/constants";

const usePusher = (channelName, eventName, callback, refetch = false) => {
  useEffect(() => {
    const authtoken = getAuthToken();
    const pusher = new Pusher(PUSHER_CONFIG.appKey, {
      cluster: PUSHER_CONFIG.cluster,
      authEndpoint: PUSHER_CONFIG.authEndpoint,
      auth: {
        headers: {
          Authorization: `Bearer ${authtoken}`,
        },
      },
    });
    // if (refetch) {
    const channel = pusher.subscribe(channelName);

    channel.bind(eventName, (data) => {
      callback(data);
    });
    // }
    return () => {
      // Cleanup when the component unmounts
      pusher.unsubscribe(channelName);
    };
  }, [channelName, eventName, callback, refetch]);
};

export default usePusher;
