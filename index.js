/**
 * @file index.js
 * @description to run a function after page loaded
 */

const isPageVisible = (document.visibilityState || document.webkitVisibilityState) === 'visible';

const delayExecute = func => {
    (isPageVisible && window.requestAnimationFrame) ? requestAnimationFrame(func) : setTimeout(func, 15);
};

export default function (func, ...args) {
    // 使用 lazyRun.call(xxx, func, ...args);
    const obj = this;

    // 如果onload已经执行了则延迟，否则挂到onload上面
    if (document.readyState === 'complete') {
        delayExecute(() => {
            func.call(obj, ...args);
        });
        return;
    }

    const handler = () => {
        delayExecute(() => {
            func.call(obj, ...args);
        });
        window.removeEventListener('load', handler);
    };

    window.addEventListener('load', handler);
};