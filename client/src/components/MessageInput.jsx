import React, { useRef, useState } from 'react';
import { useChatStore } from '../store/useChatStore';
import { Image, Send, X } from 'lucide-react';
import toast from 'react-hot-toast';

const MessageInput = () => {
  const [text, setText] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);

  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) {
      toast.error('Please select an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({ text: text.trim(), image: imagePreview });

      //clear form
      setText('');
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('failed to send messages', error);
    }
  };

  return (
    <div className=' w-full'>
      {imagePreview && (
        <div className='mb-3 flex items-center gap-2'>
          <div className='relative'>
            <img
              src={imagePreview}
              alt='Preview'
              className='w-20 h-20 object-cover rounded-lg border border-zinc-700'
            />
            <button
              type='button'
              onClick={removeImage}
              className='absolute -top-1.5 -right-1.5 w-5 h-5 p-1 rounded-full bg-amber-200 hover:bg-amber-400 flex items-center justify-center'
            >
              <X className='size-3' />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSendMessage} className='flex items-center gap-2'>
        <div className='flex items-center flex-1 gap-2'>
          <input
            type='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Type a message here...'
            className='w-full py-2 px-2 rounded-lg border border-amber-400 focus:outline-none'
          />
          <input
            type='file'
            ref={fileInputRef}
            accept='image/*'
            onChange={handleImageChange}
            className='hidden'
          />
          <button
            type='button'
            onClick={() => fileInputRef.current.click()}
            className={`hidden sm:flex cursor-pointer ${
              imagePreview ? 'text-emerald-400' : 'text-gray-400'
            }`}
          >
            <Image size={28} />
          </button>
        </div>
        <button
          type='submit'
          className='bg-amber-500 text-white py-2 px-2 rounded-lg hover:bg-amber-500 focus:outline-none'
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
