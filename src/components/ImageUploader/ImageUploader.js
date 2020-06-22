import React, { useState } from "react";
//Components
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import "./ImageUploader.scss";

export default function ImageUploader(props) {
  const { setVehicleImages, vehicleImages } = props;

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  //Functions
  const handleCancel = () => setPreviewVisible(false);

  //This function is executed when clicking on image to show it's preview
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.preview);
    setPreviewVisible(true);
  };

  //This functions gets the base64 from the selected file to get the image
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  //This handler adds the selected images to the parent state
  const handleChange = ({ fileList }) => {
    setVehicleImages({ fileList });
  };

  //This function is to override the automatic POST request sent by
  //antd Uploader, to avoid uploading images until form is done
  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  return (
    <div className="image-uploader">
      <div className="clearfix">
        <Upload
          customRequest={dummyRequest}
          listType="picture-card"
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {vehicleImages.fileList?.length >= 6 ? null : (
            <div>
              <PlusOutlined />
              <div className="ant-upload-text">Subir Imagen</div>
            </div>
          )}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    </div>
  );
}
