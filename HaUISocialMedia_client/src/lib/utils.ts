import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// import imageDb from "@/config/firepage";
// import { getDownloadURL, uploadBytes } from "firebase/storage";
// import { ref as storageRef } from "firebase/storage";
// import { v4 } from "uuid";
import LocalStorageService from "@/services/LocalStorageService";

// export const handleUploadImage = (image: File) => {
//   return new Promise((resolve, reject) => {
//     if (image !== null) {
//       const id = v4();
//       const imgRef = storageRef(imageDb, `files/${id}`);

//       uploadBytes(imgRef, image)
//         .then((value) => getDownloadURL(value.ref))
//         .then((url) => resolve(url))
//         .catch((error) => reject(error));
//     } else {
//       reject("No image selected");
//     }
//   });
// };

export const handleUploadImage = (image: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!image) return reject("No image selected");

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      return reject("Missing Cloudinary config");
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", uploadPreset);

    fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.secure_url) {
          resolve(data.secure_url);
        } else {
          reject("Upload failed");
        }
      })
      .catch((err) => reject(err));
  });
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const checkJWt = (token: string) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", options);

  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${formattedDate} at ${time}`;
}
export const multiFormatDateString = (timestamp: string = ""): string => {
  const timestampNum = Math.round(new Date(timestamp).getTime() / 1000);
  const date: Date = new Date(timestampNum * 1000);
  const now: Date = new Date();

  const diff: number = now.getTime() - date.getTime();
  const diffInSeconds: number = diff / 1000;
  const diffInMinutes: number = diffInSeconds / 60;
  const diffInHours: number = diffInMinutes / 60;
  const diffInDays: number = diffInHours / 24;

  switch (true) {
    case Math.floor(diffInDays) >= 30:
      return formatDateString(timestamp);
    case Math.floor(diffInDays) === 1:
      return `${Math.floor(diffInDays)} ngày trước`;
    case Math.floor(diffInDays) > 1 && diffInDays < 30:
      return `${Math.floor(diffInDays)} ngày trước`;
    case Math.floor(diffInHours) >= 1:
      return `${Math.floor(diffInHours)} giờ trước`;
    case Math.floor(diffInMinutes) >= 1:
      return `${Math.floor(diffInMinutes)} phút trước`;
    default:
      return "Vừa xong";
  }
};

export const handleCheckUserIsAdmin = (groupData: any) => {
  const currentUser = LocalStorageService.getLoggedInUser();
  let isAdmin = false;
  if (groupData && groupData.user) {
    const checkUserIsAdmin = groupData?.userJoins?.find(
      (menber: any) =>
        menber?.user?.id === currentUser?.id && menber.role === "ADMIN"
    );
    if (checkUserIsAdmin || currentUser?.id === groupData?.user?.id)
      isAdmin = true;
    else isAdmin = false;
  }

  return isAdmin;
};
export const handleCheckUserJoinedGroup = (groupData: any) => {
  const currentUser = LocalStorageService.getLoggedInUser();
  let isAdmin = false;
  if (groupData && groupData.user) {
    const checkUserIsAdmin = groupData?.userJoins?.find(
      (menber: any) => menber?.user?.id === currentUser?.id && menber.approved
    );
    if (checkUserIsAdmin) isAdmin = true;
    else isAdmin = false;
  }
  return isAdmin;
};
