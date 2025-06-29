import React, { useState } from "react"
import { IoMdAdd, IoMdClose } from "react-icons/io"
import { MdOutlineDeleteOutline, MdOutlineUpdate } from "react-icons/md"
import DateSelector from "./DateSelector"
import ImageSelector from "./ImageSelector"
import TagInput from "./TagInput"
import axiosInstance from "../utils/axiosInstance"
import moment from "moment"
import { toast } from "react-toastify"
import uploadImage from "../utils/uploadImage"

const AddEditTravelStory = ({
  storyInfo,
  type,
  onClose,
  getAllTravelStories,
}) => {
  const [visitedDate, setVisitedDate] = useState(storyInfo?.visitedDate || null)
  const [title, setTitle] = useState(storyInfo?.title || "")
  const [storyImg, setStoryImg] = useState(storyInfo?.imageUrl || null)
  const [story, setStory] = useState(storyInfo?.story || "")
  const [visitedLocation, setVisitedLocation] = useState(
    storyInfo?.visitedLocation || []
  )

  const [error, setError] = useState("")

  const addNewTravelStory = async () => {
    try {
      let imageUrl = ""

      // Upload image if present
      if (storyImg) {
        const imgUploadRes = await uploadImage(storyImg)

        imageUrl = imgUploadRes.imageUrl || ""
      }

      const response = await axiosInstance.post("/travel-story/add", {
        title,
        story,
        imageUrl: imageUrl || "",
        visitedLocation,
        visitedDate: visitedDate
          ? moment(visitedDate).valueOf()
          : moment().valueOf(),
      })

      if (response.data && response.data.story) {
        toast.success("Story added successfully!")

        getAllTravelStories()

        onClose()
      }
    } catch (error) {
      console.log(error)
    }
  }

  // const updateTravelStory = async () => {
  //   const storyId = storyInfo._id

  //   try {
  //     let imageUrl = ""

  //     let postData = {
  //       title,
  //       story,
  //       imageUrl: storyInfo.imageUrl || "",
  //       visitedLocation,
  //       visitedDate: visitedDate
  //         ? moment(visitedDate).valueOf()
  //         : moment().valueOf(),
  //     }

  //     if (typeof storyImg === "object") {
  //       // Upload new image
  //       const imageUploadRes = await uploadImage(storyImg)

  //       imageUrl = imageUploadRes.imageUrl || ""

  //       postData = {
  //         ...postData,
  //         imageUrl: imageUrl,
  //       }
  //     }

  //     const response = await axiosInstance.post(
  //       "/travel-story/edit-story/" + storyId,
  //       postData
  //     )

  //     if (response.data && response.data.story) {
  //       toast.success("Story updated successfully!")

  //       getAllTravelStories()

  //       onClose()
  //     }
  //   } catch (error) {
  //     if (
  //       error.response &&
  //       error.response.data &&
  //       error.response.data.message
  //     ) {
  //       setError(error.response.data.message)
  //     } else {
  //       setError("Something went wrong! Please try again.")
  //     }
  //   }
  // }

  const updateTravelStory = async () => {
  const storyId = storyInfo._id
  
  console.log("Starting update for story ID:", storyId);
  console.log("Current form data:", { title, story, visitedLocation, visitedDate, storyImg });
  
  try {
    let imageUrl = ""
    
    let postData = {
      title,
      story,
      imageUrl: storyInfo.imageUrl || "",
      visitedLocation,
      visitedDate: visitedDate
        ? moment(visitedDate).valueOf()
        : moment().valueOf(),
    }
    
    console.log("Initial postData:", postData);

    if (typeof storyImg === "object") {
      console.log("Uploading new image...");
      // Upload new image
      const imageUploadRes = await uploadImage(storyImg)
      console.log("Image upload response:", imageUploadRes);

      imageUrl = imageUploadRes.imageUrl || ""

      postData = {
        ...postData,
        imageUrl: imageUrl,
      }
      console.log("Updated postData with new image:", postData);
    }

    console.log("Making API call to:", "/travel-story/edit-story/" + storyId);
    const response = await axiosInstance.post(
      "/travel-story/edit-story/" + storyId,
      postData
    )
    
    console.log("API response:", response);
    console.log("Response data:", response.data);

    if (response.data && response.data.story) {
      console.log("Update successful, showing success message");
      toast.success("Story updated successfully!")

      console.log("Calling getAllTravelStories...");
      getAllTravelStories()

      console.log("Calling onClose...");
      onClose()
    }
  } catch (error) {
    console.error("Error occurred:", error);
    console.error("Error response:", error.response);
    console.error("Error response data:", error.response?.data);
    
    if (
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      console.log("Setting error message from server:", error.response.data.message);
      setError(error.response.data.message)
    } else {
      console.log("Setting generic error message");
      setError("Something went wrong! Please try again.")
    }
  }
}

  const handleAddOrUpdateClick = () => {
    if (!title) {
      setError("Please enter the title")
      return
    }

    if (!story) {
      setError("Please enter the story")
      return
    }

    setError("")

    if (type === "edit") {
      updateTravelStory()
    } else {
      addNewTravelStory()
    }
  }

  const handleDeleteStoryImage = async () => {
    // Deleting the image
    const deleteImageResponse = await axiosInstance.delete(
      "/travel-story/delete-image",
      {
        params: {
          imageUrl: storyInfo.imageUrl,
        },
      }
    )

    if (deleteImageResponse.data) {
      const storyId = storyInfo._id

      const postData = {
        title,
        story,
        visitedLocation,
        visitedDate: moment().valueOf(),
        imageUrl: "",
      }

      // updating story

      const response = await axiosInstance.post(
        "/travel-story/edit-story/" + storyId,
        postData
      )

      if (response.data) {
        toast.success("Story image deleted successfully")

        setStoryImg(null)

        getAllTravelStories()
      }
    }
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-medium text-slate-700">
          {type === "add" ? "Add Story" : "Update Story"}
        </h5>

        <div>
          <div className="flex items-center gap-3 bg-cyan-50/50 p-2 rounded-l-lg">
            {type === "add" ? (
              <button class="btn-small" onClick={handleAddOrUpdateClick}>
                <IoMdAdd className="text-lg" /> ADD STORY
              </button>
            ) : (
              <>
                <button className="btn-small" onClick={handleAddOrUpdateClick}>
                  <MdOutlineUpdate className="text-lg" /> UPDATE STORY
                </button>

                <button className="btn-small btn-delete">
                  <MdOutlineDeleteOutline className="text-lg" /> DELETE STORY
                </button>
              </>
            )}

            <button class="" onClick={onClose}>
              <IoMdClose className="text-xl text-slate-400" />
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-xs pt-2 text-right">{error}</p>
          )}
        </div>
      </div>

      <div>
        <div className="flex flex-1 flex-col gap-2 pt-4">
          <label className="input-label">TITLE</label>

          <input
            type="text"
            className="text-2xl text-slate-900 outline-none"
            placeholder="Once Upon A Time..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="my-3">
            <DateSelector date={visitedDate} setDate={setVisitedDate} />
          </div>

          <ImageSelector
            image={storyImg}
            setImage={setStoryImg}
            handleDeleteImage={handleDeleteStoryImage}
          />

          <div className="flex flex-col gap-2 mt-4">
            <label className="input-label">STORY</label>

            <textarea
              type="text"
              className="text-sm text-slate-950 outline-none bg-slate-100 p-2 rounded-sm"
              placeholder="Your Story"
              rows={10}
              value={story}
              onChange={(e) => setStory(e.target.value)}
            />
          </div>

          <div className="pt-3">
            <label className="input-label">VISITED LOCATIONS</label>

            <TagInput tags={visitedLocation} setTags={setVisitedLocation} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddEditTravelStory