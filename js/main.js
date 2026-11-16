// 自定义提示框通用方法
function showCustomToast(message) {
const container = document.getElementById('toastContainer');
const toast = document.createElement('div');
toast.className = 'custom-toast';

toast.innerHTML = `
<i class="fa-solid fa-circle-info toast-icon"></i>
<div class="toast-content">${message}</div>
<button class="toast-close-btn" onclick="closeToast(this.parentElement)">
<i class="fa-solid fa-xmark"></i>
</button>
`;

container.appendChild(toast);

// 3秒后自动关闭提示框
setTimeout(() => {
closeToast(toast);
}, 3000);
}

// 关闭提示框方法
function closeToast(toastElement) {
if (!toastElement || toastElement.classList.contains('toast-closing')) return;
toastElement.classList.add('toast-closing');
setTimeout(() => {
if (toastElement.parentElement) {
toastElement.parentElement.removeChild(toastElement);
}
}, 250);
}

// 全端兼容粘贴逻辑
document.getElementById('pasteBtn').addEventListener('click', async function() {
const urlInput = document.getElementById('videoUrl');
const btn = this;

// 按钮防抖，防止重复点击
btn.disabled = true;
btn.style.opacity = '0.6';

try {
// 优先使用现代剪贴板API
if (navigator.clipboard && navigator.clipboard.readText) {
const text = await navigator.clipboard.readText();
urlInput.value = text;
} else {
// 降级方案：聚焦输入框唤起系统粘贴菜单
urlInput.focus();
showCustomToast('请长按输入框 选择粘贴');
}
} catch (err) {
// 权限不足或环境不支持时的兜底提示
urlInput.focus();
showCustomToast('未获得剪贴板权限 请手动粘贴');
} finally {
// 恢复按钮状态
setTimeout(() => {
btn.disabled = false;
btn.style.opacity = '1';
}, 1000);
}
});

function getFullUrl() {
const api = document.getElementById('apiSelect').value;
const url = document.getElementById('videoUrl').value.trim();
if (!url) { 
showCustomToast('请先输入需要解析的链接'); 
return null; 
}
let finalUrl = url;
return api + encodeURIComponent(finalUrl);
}

function playHere() {
const fullUrl = getFullUrl();
const frame = document.getElementById('playerFrame');
const placeholder = document.getElementById('playerPlaceholder');

if (fullUrl) {
// 有有效链接时隐藏提示，加载解析页面
placeholder.style.display = 'none';
frame.src = fullUrl;
} else {
// 链接为空时重置播放器，重新显示等待提示
frame.src = 'about:blank';
placeholder.style.display = 'block';
}
}