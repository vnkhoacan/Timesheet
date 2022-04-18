// components
import Avatar from "../../../../components/Avatar/FlexAvatar";
import LocalAvatar from "../../../../components/Avatar/LocalFlexAvatar";
import BaseInput from "../../../../components/FormValidation/BaseInput";
import NumberValidation from "../../../../components/FormValidation/NumberValidation";
import PasswordInput from "../../../../components/FormValidation/PasswordInput";
import Header from "../../../../components/Text/Header";
import TextAlert from "../../../../components/Alert/Text/TextAlert";
import SubmitButton from "../../../../components/Button/SubmitButton";
// modules
import { useEffect, useState } from "react";
import NativeStorage from "../../../../services/NativeStorage/NativeStorage";
import { useDispatch, useSelector } from "react-redux";
import HttpClient from "../../../../services/HttpClient/HttpClient";
// stylesheet
import "./Profile.css";

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    street_code: "",
    street_name: "",
    area: "",
    city: "",
    country: "",
    gender: "",
  });

  const [avatar, setAvatar] = useState<string>("");

  const [oldAvatar, setOldAvatar] = useState<string>("");

  const [avatarFiles, setAvatarFiles] = useState<any>([]);

  const memberInfo = useSelector((s: any) => s.memberInfo);

  const isLogedIn = useSelector((s: any) => s.isLogedIn);

  const [isLoaded, setIsLoaded] = useState<boolean>(true);

  const [error, setError] = useState<string>("");

  const [isSubmited, setIsSubmited] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleChange = (e: any, name: string): void => {
    var newUser: any = { ...user };
    newUser[name] = e.target.value;
    setError("");
    setUser(newUser);
  };

  const loadProfile = async (): Promise<void> => {
    var result = await HttpClient.post("User/LoadProfile", {
      member_id: memberInfo.member_id,
    });

    setUser({ ...user, ...result });
    setAvatar(result.avatar?result.avatar:"");
    setOldAvatar(result.avatar);
  };

  const uploadAvatar = (): void => {
    var input: any = document.createElement("input");
    input.type = "file";
    input.onchange = async (e: any) => {
      var url = URL.createObjectURL(e.target.files[0]);

      setAvatar(url);
      setAvatarFiles(e.target.files);
    };
    input.click();
  };

  const saveProfile = async (e: any): Promise<void> => {
    e.preventDefault();
    var isValid = true;
    setIsSubmited(true);

    var oldAvatarTemp = "";

    if (avatar !== oldAvatar) {
      var data = new FormData();
      data.append("avatar", avatarFiles[0]);
      var path = await HttpClient.upload("User/SaveAvatar", data);
      user.avatar = path;
      oldAvatarTemp = path;
      var newMemberInfo = { ...memberInfo };
      newMemberInfo.avatar = path;
      await NativeStorage.set("memberInfo", newMemberInfo);
      dispatch({
        type: "SET_STATE",
        payload: {
          memberInfo: newMemberInfo,
        },
      });
    }
    for (var item in user)
      if (!user[item] && item !== "avatar" && item !== "address_id")
        isValid = false;
    if (isValid) {
      var result = await HttpClient.post("User/SaveProfile", {
        user: user,
        oldAvatar: avatar !== oldAvatar ? oldAvatar : "",
      });
      if (result) {
        setError("success");
        setIsLoaded(true);
      } else {
        setError("fail");
        setIsLoaded(true);
      }
    }
    setOldAvatar(oldAvatarTemp);
  };

  const Message: React.FC = () => {
    if (error === "success")
      return (
        <TextAlert severity="success" error="You has saved successfully" />
      );
    if (error === "fail")
      return <TextAlert severity="info" error="You has failed to save" />;
    return <> </>;
  };

  useEffect(() => {
    if (isLogedIn) {
      loadProfile();
    }
  }, [isLogedIn]);

  return (
    <div className="profile">
      <Header title="Profile" />
      <div className="row m-0 mt-5 px-5 pb-3">
        <Message />
        <div className="col-xl-4 col-12 large-font-size">
          <div className="mb-3 profile_avatar d-flex">
            <div className="profile_avatar_main m-auto">
              {avatar.indexOf("blob") < 0 ? (
                <Avatar
                  style={{ width: "200px", height: "200px" }}
                  src={avatar}
                  name={user.first_name + " " + user.last_name}
                />
              ) : (
                <LocalAvatar
                  style={{ width: "200px", height: "200px" }}
                  src={avatar}
                  name={user.first_name + " " + user.last_name}
                />
              )}
              <div
                onClick={() => uploadAvatar()}
                className="profile_avatar_photo-camera"
              >
                <div className="d-flex w-100 h-100">
                  <i className="material-icons m-auto">photo_camera</i>
                </div>
              </div>
            </div>
          </div>
          <p className="medium-weight text-center">
            {user.first_name + " " + user.last_name}
          </p>
          <p className="light-color text-center">{user.email}</p>
          <div className="d-flex">
            <div className="medium-weight w-50">Department</div>
            <div className="">{user.department_name}</div>
          </div>
          <div className="d-flex">
            <div className="medium-weight w-50">Position</div>
            <div className="">{user.position_name}</div>
          </div>
        </div>
        <div className="col-xl-4 col-12">
          <BaseInput
            defaultValue={user.first_name}
            errorMessage="First Name must contain a-z A-Z."
            label="First Name"
            regex={/^[A-Za-z\d]{3,}$/}
            isRequired={true}
            handleChange={(event: any) => {
              handleChange(event, "first_name");
            }}
            isSubmited={isSubmited}
          />
          <BaseInput
            defaultValue={user.last_name}
            errorMessage="Last Name must contain a-z A-Z."
            label="Last Name"
            regex={/^[A-Za-z\d]{3,}$/}
            isRequired={true}
            handleChange={(event: any) => {
              handleChange(event, "last_name");
            }}
            isSubmited={isSubmited}
          />
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              value={user.email}
              disabled
            />
          </div>

          <PasswordInput
            defaultValue={user.password}
            errorMessage="Password contains a-z, A-Z, 0-9 and minimum 8 characters"
            label="Password : "
            regex={/^(?=[A-Za-z])(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d]{8,}$/}
            isRequired={true}
            handleChange={(event: any) => {
              handleChange(event, "password");
            }}
            isSubmited={isSubmited}
          />
         
        </div>
        <div className="col-xl-4 col-12">
          <div>
            <NumberValidation
              defaultValue={user.street_code}
              label="Street Code : "
              isRequired={false}
              handleChange={(event: any) => {
                handleChange(event, "street_code");
              }}
              from={0}
              to={1000}
              isSubmited={isSubmited}
            />
            <BaseInput
              defaultValue={user.street_name}
              errorMessage="Invalid."
              label="Street Name : "
              regex={/^/}
              isRequired={false}
              handleChange={(event: any) => {
                handleChange(event, "street_name");
              }}
              isSubmited={isSubmited}
            />
            <BaseInput
              defaultValue={user.area}
              errorMessage="Invalid."
              label="Area : "
              regex={/^/}
              isRequired={false}
              handleChange={(event: any) => {
                handleChange(event, "area");
              }}
              isSubmited={isSubmited}
            />
            <BaseInput
              defaultValue={user.city}
              errorMessage="Invalid."
              label="City : "
              regex={/^/}
              isRequired={false}
              handleChange={(event: any) => {
                handleChange(event, "city");
              }}
              isSubmited={isSubmited}
            />
            <BaseInput
              defaultValue={user.country}
              errorMessage="Invalid."
              label="Country : "
              regex={/^/}
              isRequired={false}
              handleChange={(event: any) => {
                handleChange(event, "country");
              }}
              isSubmited={isSubmited}
            />

            <form onSubmit={(e: any) => saveProfile(e)}>
              <SubmitButton hasLoaded={isLoaded} text="Save Profile" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
