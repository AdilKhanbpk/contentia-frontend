declare global {
    namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_HOTJAR_ID: string;
      NEXT_PUBLIC_HOTJAR_VERSION: string;
      // ...other env variables
    }
  }
}

export const hotjar = {
  initialize(hjid: string, hjsv: string) {
    if (typeof window !== 'undefined') {
      (function(h: any,o: any,t: any,j: any,a?: any,r?: any){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid: parseInt(hjid), hjsv: parseInt(hjsv)};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    }
  }
};