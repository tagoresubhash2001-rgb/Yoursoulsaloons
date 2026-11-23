import React, { memo } from 'react';
import { PageRoute } from '../types';

interface SkeletonProps {
  className?: string;
  tone?: 'light' | 'dark';
}

export const Skeleton: React.FC<SkeletonProps> = memo(({ className = '', tone = 'light' }) => {
  return (
    <div
      className={`${tone === 'dark' ? 'skeleton-shimmer-dark' : 'skeleton-shimmer'} rounded-md ${className}`}
      aria-hidden="true"
    />
  );
});

Skeleton.displayName = 'Skeleton';

/**
 * Matches exact BannerSlot geometry (aspect-[2.4/1] lg:aspect-[2.5/1], min-h-[460px..520px], max-h-[560px])
 * to prevent Cumulative Layout Shift (CLS) during lazy route transitions.
 */
export const BannerSkeleton: React.FC = memo(() => {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#FAF8F5] px-4 sm:px-6 lg:px-8 py-3 sm:py-5"
      aria-hidden="true"
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative w-full overflow-hidden rounded-[18px] sm:rounded-[22px] border border-[#DFD6CB] bg-[#173451] aspect-[2.4/1] lg:aspect-[2.5/1] min-h-[460px] sm:min-h-[490px] lg:min-h-[520px] max-h-[560px] flex items-end">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A121E]/90 via-[#0A121E]/45 to-transparent" />
          <div className="relative z-10 w-full p-6 sm:p-10 md:p-14 lg:p-16">
            <div className="max-w-4xl space-y-4">
              <Skeleton tone="dark" className="h-3.5 w-48 sm:w-64 rounded-full" />
              <Skeleton tone="dark" className="h-10 sm:h-14 w-11/12 max-w-2xl rounded-lg" />
              <Skeleton tone="dark" className="h-5 sm:h-6 w-4/5 max-w-xl rounded-md" />
              <div className="flex flex-wrap gap-3 sm:gap-4 pt-3">
                <Skeleton tone="dark" className="h-11 w-40 rounded-[10px]" />
                <Skeleton tone="dark" className="h-11 w-36 rounded-[10px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

BannerSkeleton.displayName = 'BannerSkeleton';

export const ServiceCardSkeleton: React.FC = memo(() => {
  return (
    <div
      className="bg-[#FAF8F5] card-thick-border border-2 border-[#14171A] rounded-[16px] overflow-hidden flex flex-col justify-between"
      aria-hidden="true"
    >
      <div>
        <Skeleton className="w-full aspect-[16/10] rounded-none" />
        <div className="p-6 sm:p-7 space-y-3">
          <Skeleton className="h-3 w-36 rounded-full" />
          <Skeleton className="h-7 w-4/5 rounded-md" />
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-5/6" />
          <div className="pt-4 border-t border-[#EAE1D5] flex flex-wrap gap-2">
            <Skeleton className="h-7 w-28 rounded-[8px]" />
            <Skeleton className="h-7 w-32 rounded-[8px]" />
            <Skeleton className="h-7 w-24 rounded-[8px]" />
          </div>
        </div>
      </div>
      <div className="p-6 pt-0 flex items-center gap-2.5">
        <Skeleton className="h-11 flex-1 rounded-[10px]" />
        <Skeleton className="h-11 w-11 rounded-[10px]" />
      </div>
    </div>
  );
});

ServiceCardSkeleton.displayName = 'ServiceCardSkeleton';

export const CourseCardSkeleton: React.FC = memo(() => {
  return (
    <div
      className="bg-[#FAF8F5] card-thick-border border-2 border-[#14171A] rounded-[18px] overflow-hidden flex flex-col justify-between"
      aria-hidden="true"
    >
      <div>
        <Skeleton className="w-full aspect-[16/10] rounded-none" />
        <div className="p-5 sm:p-6 space-y-3.5">
          <Skeleton className="h-7 w-32 rounded-md" />
          <Skeleton className="h-3 w-44 rounded-full" />
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-11/12" />
          <div className="pt-3 border-t border-[#EAE1D5] space-y-2.5">
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      </div>
      <div className="p-5 sm:p-6 pt-4 bg-[#F2EDE5] border-t border-[#DFD6CB] space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-28" />
        </div>
        <Skeleton className="h-11 w-full rounded-[10px]" />
      </div>
    </div>
  );
});

CourseCardSkeleton.displayName = 'CourseCardSkeleton';

const EditorialSplitSkeleton: React.FC<{ reverse?: boolean }> = memo(({ reverse = false }) => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center" aria-hidden="true">
    <div className={`lg:col-span-6 ${reverse ? 'lg:order-2' : 'lg:order-1'}`}>
      <Skeleton className="w-full aspect-[4/3] rounded-[16px] card-thick-border border-2 border-[#14171A]" />
    </div>
    <div className={`lg:col-span-6 space-y-4 ${reverse ? 'lg:order-1' : 'lg:order-2'}`}>
      <Skeleton className="h-3.5 w-36 rounded-full" />
      <Skeleton className="h-9 w-4/5 rounded-md" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-11/12" />
      <Skeleton className="h-4 w-3/4" />
      <div className="pt-3 flex flex-wrap gap-2">
        <Skeleton className="h-8 w-36 rounded-[8px]" />
        <Skeleton className="h-8 w-32 rounded-[8px]" />
        <Skeleton className="h-8 w-28 rounded-[8px]" />
      </div>
      <div className="pt-2 flex gap-3">
        <Skeleton className="h-11 w-44 rounded-[10px]" />
        <Skeleton className="h-11 w-36 rounded-[10px]" />
      </div>
    </div>
  </div>
));

EditorialSplitSkeleton.displayName = 'EditorialSplitSkeleton';

interface PageSkeletonProps {
  variant?: PageRoute;
}

export const PageSkeleton: React.FC<PageSkeletonProps> = memo(({ variant = 'home' }) => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading page content"
      className="w-full bg-[#FAF8F5] pb-20"
    >
      <span className="sr-only">Loading page content...</span>

      {/* Exact-geometry Hero / Banner Skeleton */}
      <BannerSkeleton />

      {/* Route-Matched Content Skeleton to minimize CLS */}
      {variant === 'contact' ? (
        <section className="w-full py-16 md:py-24 border-t border-[#E8E1D7]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5 space-y-6">
              <Skeleton className="h-3.5 w-40 rounded-full" />
              <Skeleton className="h-10 w-4/5 rounded-md" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <div className="pt-6 border-t border-[#E8E1D7] space-y-5">
                <Skeleton className="h-16 w-full rounded-[10px]" />
                <Skeleton className="h-12 w-3/4 rounded-[10px]" />
                <Skeleton className="h-12 w-2/3 rounded-[10px]" />
              </div>
            </div>
            <div className="lg:col-span-7 rounded-[18px] card-thick-border border-2 border-[#14171A] bg-[#FAF8F5] p-6 sm:p-10 space-y-6">
              <div className="space-y-2 pb-5 border-b border-[#EAE1D5]">
                <Skeleton className="h-3 w-40 rounded-full" />
                <Skeleton className="h-8 w-64 rounded-md" />
                <Skeleton className="h-3.5 w-full max-w-md" />
              </div>
              <Skeleton className="h-12 w-full rounded-[10px]" />
              <Skeleton className="h-12 w-full rounded-[10px]" />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {Array.from({ length: 12 }).map((_, i) => (
                  <Skeleton key={i} className="h-[58px] w-full rounded-[10px]" />
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Skeleton className="h-11 w-full rounded-[10px]" />
                <Skeleton className="h-11 w-full rounded-[10px]" />
              </div>
              <Skeleton className="h-12 w-full rounded-[10px]" />
            </div>
          </div>
        </section>
      ) : variant === 'about' ? (
        <section className="w-full py-16 md:py-24 border-t border-[#E8E1D7]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <Skeleton className="h-3.5 w-44 mx-auto rounded-full" />
              <Skeleton className="h-10 w-4/5 mx-auto rounded-md" />
              <Skeleton className="h-4 w-11/12 max-w-2xl mx-auto" />
            </div>
            <EditorialSplitSkeleton />
            <EditorialSplitSkeleton reverse />
          </div>
        </section>
      ) : variant === 'services' ? (
        <section className="w-full py-16 md:py-24 border-t border-[#E8E1D7]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <Skeleton className="h-3.5 w-44 mx-auto rounded-full" />
              <Skeleton className="h-10 w-3/4 mx-auto rounded-md" />
              <Skeleton className="h-4 w-5/6 mx-auto" />
            </div>
            <EditorialSplitSkeleton />
            <EditorialSplitSkeleton reverse />
          </div>
        </section>
      ) : (
        /* Home Variant */
        <section className="w-full py-20 sm:py-28 border-t border-[#E8E1D7]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <Skeleton className="h-3.5 w-48 mx-auto rounded-full" />
              <Skeleton className="h-10 w-3/4 mx-auto rounded-md" />
              <Skeleton className="h-4 w-5/6 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCardSkeleton />
              <ServiceCardSkeleton />
              <ServiceCardSkeleton />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <CourseCardSkeleton />
              <CourseCardSkeleton />
              <CourseCardSkeleton />
              <CourseCardSkeleton />
            </div>
          </div>
        </section>
      )}
    </div>
  );
});

PageSkeleton.displayName = 'PageSkeleton';
