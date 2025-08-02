import React, { useRef, useEffect } from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  posterImage: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, posterImage }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          videoRef.current.load();
          await videoRef.current.play();
        } catch (error) {
          console.log('Video playback failed:', error);
        }
      }
    };
    
    playVideo();
  }, [videoUrl]);

  return (
    <div className="absolute inset-0 w-full h-full">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={videoUrl}
        poster={posterImage}
        autoPlay
        muted
        loop
        playsInline
        onError={(e) => console.log('Video error:', e)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
    </div>
  );
};

export default VideoPlayer;
