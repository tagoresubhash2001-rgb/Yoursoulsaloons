import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div
      className={`animate-pulse bg-[#EFE9DF] rounded-md ${className}`}
      aria-hidden="true"
    />
  );
};

export const BannerSkeleton: React.FC = () => {
  return (
    <div className="relative w-full aspect-[16/9] max-h-[85vh] min-h-[460px] bg-[#EFE9DF] overflow-hidden flex items-end">
      <div className="absolute inset-0 bg-gradient-to-t from-[#14171A]/40 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-6 pb-16 w-full space-y-4">
        <Skeleton className="h-4 w-32 bg-white/30" />
        <Skeleton className="h-12 w-3/4 max-w-xl bg-white/30" />
        <Skeleton className="h-6 w-1/2 max-w-md bg-white/30" />
        <div className="flex gap-4 pt-4">
          <Skeleton className="h-11 w-36 bg-white/40 rounded-[10px]" />
          <Skeleton className="h-11 w-36 bg-white/20 rounded-[10px]" />
        </div>
      </div>
    </div>
  );
};

export const ServiceCardSkeleton: React.FC = () => {
  return (
    <div className="bg-[#FAF8F5] border border-[#DFD6CB] rounded-2xl overflow-hidden shadow-xs flex flex-col">
      <Skeleton className="w-full aspect-[4/3] rounded-none bg-[#EAE1D5]" />
      <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <Skeleton className="h-3 w-20 bg-[#DFD6CB]" />
          <Skeleton className="h-6 w-3/4 bg-[#DFD6CB]" />
          <Skeleton className="h-4 w-full bg-[#EAE1D5]" />
          <Skeleton className="h-4 w-5/6 bg-[#EAE1D5]" />
        </div>
        <div className="pt-4 border-t border-[#DFD6CB]/40 flex items-center justify-between">
          <Skeleton className="h-4 w-16 bg-[#DFD6CB]" />
          <Skeleton className="h-9 w-28 rounded-[10px] bg-[#DFD6CB]" />
        </div>
      </div>
    </div>
  );
};

export const CourseCardSkeleton: React.FC = () => {
  return (
    <div className="bg-[#FAF8F5] border border-[#DFD6CB] rounded-2xl p-6 space-y-4 shadow-xs flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Skeleton className="h-3 w-24 bg-[#DFD6CB]" />
          <Skeleton className="h-3 w-16 bg-[#DFD6CB]" />
        </div>
        <Skeleton className="h-6 w-4/5 bg-[#DFD6CB]" />
        <Skeleton className="h-4 w-full bg-[#EAE1D5]" />
        <Skeleton className="h-4 w-3/4 bg-[#EAE1D5]" />
        <div className="pt-2 space-y-2">
          <Skeleton className="h-3 w-full bg-[#EAE1D5]" />
          <Skeleton className="h-3 w-5/6 bg-[#EAE1D5]" />
        </div>
      </div>
      <div className="pt-4 border-t border-[#DFD6CB]/40 flex items-center justify-between">
        <Skeleton className="h-5 w-20 bg-[#DFD6CB]" />
        <Skeleton className="h-9 w-28 rounded-[10px] bg-[#DFD6CB]" />
      </div>
    </div>
  );
};

export const PageSkeleton: React.FC = () => {
  return (
    <div className="space-y-16 animate-fade-in pb-20">
      <BannerSkeleton />
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="space-y-3 text-center max-w-xl mx-auto">
          <Skeleton className="h-3 w-24 mx-auto bg-[#DFD6CB]" />
          <Skeleton className="h-8 w-3/4 mx-auto bg-[#DFD6CB]" />
          <Skeleton className="h-4 w-5/6 mx-auto bg-[#EAE1D5]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCardSkeleton />
          <ServiceCardSkeleton />
          <ServiceCardSkeleton />
        </div>
      </div>
    </div>
  );
};
