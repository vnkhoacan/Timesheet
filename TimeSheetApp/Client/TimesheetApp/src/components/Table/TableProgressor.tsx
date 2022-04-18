import { IonSkeletonText } from "@ionic/react";

const TableProgressor: React.FC = () => {
  return (
    <div className="border" style={{ borderRadius: "10px" }}>
      <div className="ion-padding custom-skeleton">
        <IonSkeletonText animated style={{ height: "30px" }} />
        <div className="dropdown-divider pt-3 pb-3" />
        <IonSkeletonText animated style={{ height: "30px" }} />
        <IonSkeletonText animated style={{ height: "30px" }} />
        <IonSkeletonText animated style={{ height: "30px" }} />
        <IonSkeletonText animated style={{ height: "30px" }} />
        <IonSkeletonText animated style={{ height: "30px" }} />
        <IonSkeletonText animated style={{ height: "30px" }} />
        <IonSkeletonText animated style={{ height: "30px" }} />
        <IonSkeletonText animated style={{ height: "30px" }} />
        <IonSkeletonText animated style={{ height: "30px" }} />
        <IonSkeletonText animated style={{ height: "30px" }} />
      </div>
    </div>
  );
};

export default TableProgressor;
