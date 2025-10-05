import React, { useState, useEffect } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import { useParams } from "react-router-dom";
import { GetQuestion } from "../redux/api/questionApi";
import { useSelector } from "react-redux";
import useToast from "../hooks/useToast";

const ViewQuestion = () => {
  const { id } = useParams();
  const token = useSelector((state) => state.central.token);
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const data = await GetQuestion(token, id);
        setDetails(data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch question data");
        setIsLoading(false);
      }
    };

    fetchQuestion();
  }, [id, token]);

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!details) return null;

  return (
    <div className="flex flex-col min-h-screen bg-contentBg">
      {/* Header */}
      <div className="flex md:flex-row flex-col mt-6 ml-6 md:gap-[22px] gap-[15px]">
        <span className="font-urbanist font-semibold text-black text-[28px]">
          View Question
        </span>
        <Breadcrumbs />
      </div>

      {/* Card */}
      <div className="mt-6 mx-6 rounded-2xl mb-10 bg-white shadow-md p-6">
        {/* Meta Info */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mb-6">
          {[
            { label: "Subject", value: details.subject },
            { label: "Exam", value: details.exam },
            { label: "Class", value: details.class },
            { label: "Chapter", value: details.chapter },
            { label: "Topic", value: details.topic },
            { label: "Subtopic", value: details.subtopic },
            { label: "Answer", value: details.answer },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between border-b pb-2 text-sm"
            >
              <span className="font-semibold text-gray-700">{item.label}</span>
              <span className="text-gray-900">{item.value || "—"}</span>
            </div>
          ))}
        </div>

        {/* Question Image */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Question</h3>
          {details.question_image_url ? (
            <img
              src={details.question_image_url}
              alt="Question"
              className="w-full max-w-lg rounded-lg border shadow"
            />
          ) : (
            <span className="text-gray-500">No image available</span>
          )}
        </div>

        {/* Option Images */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Options</h3>
          <div className="grid grid-cols-2 gap-4">
            {details.option_images_url?.length > 0 ? (
              details.option_images_url.map((url, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center border p-2 rounded-lg shadow"
                >
                  <span className="font-semibold text-sm mb-1">
                    Option {String.fromCharCode(65 + index)}
                  </span>
                  <img
                    src={url}
                    alt={`Option ${String.fromCharCode(65 + index)}`}
                    className="max-h-40 object-contain rounded"
                  />
                </div>
              ))
            ) : (
              <span className="text-gray-500">No option images available</span>
            )}
          </div>
        </div>

        {/* Solution Image */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Solution</h3>
          {details.solution_image_url ? (
            <img
              src={details.solution_image_url}
              alt="Solution"
              className="w-full max-w-lg rounded-lg border shadow"
            />
          ) : (
            <span className="text-gray-500">No image available</span>
          )}
        </div>

        {/* Answer Image */}
<div>
  <h3 className="font-semibold text-lg mb-2">Answer Image</h3>
  {details.answer_image_url ? (
    <img
      src={details.answer_image_url}
      alt="Answer"
      className="w-16 h-16 object-contain rounded-lg border shadow"
    />
  ) : (
    <span className="text-gray-500">No image available</span>
  )}
</div>

      </div>
    </div>
  );
};

export default ViewQuestion;
