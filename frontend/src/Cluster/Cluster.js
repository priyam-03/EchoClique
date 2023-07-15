import React, { useState, useEffect } from "react";
import CustomPrimaryButton from "../shared/components/CustomPrimaryButton";
import ClusterDialog from "./ClusterDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  connectWithSocketServer,
  disconnect,
} from "../realtimeCommunication/socketConnection";
import { profile } from "../features/auth/authActions";
import ClusterMessageDialogue from "./ClusterMessageDialogue";
const additionalStyles = {
  marginTop: "10px",
  marginLeft: "5px",
  width: "80%",
  height: "30px",
  background: "#3ba55d",
};

const Cluster = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [cluster, setCluster] = useState({});
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    connectWithSocketServer(userInfo);
    return () => {
      disconnect();
    };
  }, []);
  useEffect(() => {
    dispatch(profile());
  }, [isDialogOpen]);
  const handleOpenAddClusterDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseAddClusterDialog = () => {
    setIsDialogOpen(false);
  };
  const handleOpenMessageDialog = (cluster) => {
    console.log(cluster);
    setCluster(cluster);
    setIsMessageDialogOpen(true);
  };

  const handleCloseMessageDialog = () => {
    setIsMessageDialogOpen(false);
  };

  return (
    <>
      <CustomPrimaryButton
        additionalStyles={additionalStyles}
        label="Add Cluster"
        onClick={handleOpenAddClusterDialog}
      />
      <ClusterDialog
        isDialogOpen={isDialogOpen}
        closeDialogHandler={handleCloseAddClusterDialog}
      />
      <ul>
        {userInfo.user.clusters.length > 0 &&
          userInfo.user.clusters.map((c) => {
            return (
              <button key={c._id} onClick={() => handleOpenMessageDialog(c)}>
                {c.name}
              </button>
            );
          })}
      </ul>
      <ClusterMessageDialogue
        isMessageDialogOpen={isMessageDialogOpen}
        cluster={cluster}
        closeMessageDialogHandler={handleCloseMessageDialog}
      />
    </>
  );
};

export default Cluster;
