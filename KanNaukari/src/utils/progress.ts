import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

    NProgress.configure({
        showSpinner: false,
        trickleSpeed: 100,
    })

    const progressStart=()=>{
        NProgress.start();
    }

    const progressEnd=()=>{
        NProgress.done();
    }

    export {progressStart,progressEnd};