import * as React from 'react';

function YoutubeLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={29} height={26} fill="none" {...props}>
      <path
        d="M26.1 18.363c-.242 1.137-1.269 2.004-2.538 2.166-1.993.271-5.316.596-9.062.596a71.67 71.67 0 01-9.063-.596C4.17 20.367 3.143 19.5 2.9 18.363c-.242-1.246-.483-3.088-.483-5.363 0-2.275.241-4.117.483-5.362C3.142 6.5 4.169 5.633 5.438 5.47a69.997 69.997 0 019.062-.596c3.746 0 7.008.325 9.063.596 1.268.162 2.295 1.029 2.537 2.167.242 1.245.544 3.087.544 5.362-.06 2.275-.302 4.117-.544 5.363z"
        fill="#FF3D00"
      />
      <path d="M12.083 16.792V9.208L19.333 13l-7.25 3.792z" fill="#fff" />
    </svg>
  );
}
function YoutubeLogoSm(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="11"
      viewBox="0 0 16 11"
      fill="none"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.6407 9.13045C15.4809 9.90007 14.8027 10.4869 13.9646 10.5966C12.6484 10.78 10.4538 11 7.97986 11C5.97841 10.9954 3.97927 10.8606 1.99447 10.5966C1.15772 10.4869 0.479465 9.90007 0.318983 9.13045C0.159161 8.28706 0 7.04024 0 5.50034C0 3.96043 0.159161 2.71362 0.318983 1.8709C0.478805 1.10061 1.15706 0.513753 1.99513 0.403421C3.97942 0.136312 5.97853 0.00155437 7.97986 0C10.4538 0 12.6081 0.219986 13.9652 0.403421C14.8027 0.513076 15.4809 1.09993 15.6407 1.87022C15.8006 2.71294 16 3.95976 16 5.49966C15.9604 7.03957 15.8006 8.28638 15.6407 9.12978V9.13045Z"
        fill="#FF3D00"
      />
      <path d="M6.5 7.292V3.5L10.75 5.396L6.5 7.292Z" fill="white" />
    </svg>
  );
}

const MemoYoutubeLogoSm = React.memo(YoutubeLogoSm);
export { MemoYoutubeLogoSm };
const MemoYoutubeLogo = React.memo(YoutubeLogo);
export default MemoYoutubeLogo;
