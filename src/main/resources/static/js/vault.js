/**
 * PawLife Engineering Portfolio & Confidential Work Showcase Vault (vault.js)
 * Enables authorized reviewers/interviewers to inspect architecture artifacts,
 * design specifications, code deliverables, and project documents.
 */

const VaultModule = {
    currentKey: '',
    cachedFiles: [],

    init() {
        console.log('🔒 Initializing Confidential Work Showcase Module...');
        this.bindEvents();
        this.checkUrlForDirectKey();
    },

    bindEvents() {
        // Listen for hashchange to switch to showcase mode smoothly
        window.addEventListener('hashchange', () => {
            if (window.location.hash.toLowerCase().includes('#showcase') || window.location.hash.toLowerCase().includes('#vault')) {
                this.openModal();
            }
        });

        // Secret keyboard shortcut: Ctrl + Shift + S (Showcase) or Ctrl + Shift + V (Vault)
        window.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && (e.key === 'S' || e.key === 's' || e.key === 'V' || e.key === 'v')) {
                e.preventDefault();
                this.openModal();
            }
        });
    },

    checkUrlForDirectKey() {
        const urlParams = new URLSearchParams(window.location.search);
        const hash = window.location.hash;
        const key = urlParams.get('key') || urlParams.get('token') || urlParams.get('passcode');

        if (hash.toLowerCase().includes('#showcase') || hash.toLowerCase().includes('#vault') || key) {
            this.openModal();
            if (key) {
                const passInput = document.getElementById('vault-passcode-input');
                if (passInput) passInput.value = key;
                this.unlockVault(key);
            }
        }
    },

    openModal() {
        const modal = document.getElementById('showcase-vault-modal');
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
            // Check if already authenticated in this session
            const savedKey = sessionStorage.getItem('pawlife_vault_key');
            if (savedKey) {
                this.currentKey = savedKey;
                this.showUnlockedView();
                this.loadFiles();
            } else {
                this.showLockedView();
            }
        }
    },

    closeModal() {
        const modal = document.getElementById('showcase-vault-modal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
            if (window.location.hash.toLowerCase().includes('#showcase') || window.location.hash.toLowerCase().includes('#vault')) {
                history.replaceState(null, document.title, window.location.pathname + window.location.search);
            }
        }
    },

    showLockedView() {
        const lockedSection = document.getElementById('vault-locked-view');
        const unlockedSection = document.getElementById('vault-unlocked-view');
        if (lockedSection) lockedSection.classList.remove('hidden');
        if (unlockedSection) unlockedSection.classList.add('hidden');
    },

    showUnlockedView() {
        const lockedSection = document.getElementById('vault-locked-view');
        const unlockedSection = document.getElementById('vault-unlocked-view');
        if (lockedSection) lockedSection.classList.add('hidden');
        if (unlockedSection) unlockedSection.classList.remove('hidden');
    },

    async handleUnlockSubmit(event) {
        if (event) event.preventDefault();
        const input = document.getElementById('vault-passcode-input');
        const key = (input ? input.value : '').trim();
        if (!key) {
            this.showError('Please enter an access pass or reviewer token.');
            return;
        }
        await this.unlockVault(key);
    },

    async unlockVault(key) {
        const btn = document.getElementById('vault-unlock-btn');
        if (btn) btn.disabled = true;

        try {
            const res = await fetch('/api/vault/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ passcode: key })
            });

            const data = await res.json();
            if (data.success) {
                this.currentKey = key;
                sessionStorage.setItem('pawlife_vault_key', key);
                this.showUnlockedView();
                await this.loadFiles();
            } else {
                this.showError(data.error || 'Access Denied: Invalid VIP Passcode.');
            }
        } catch (err) {
            this.showError('Network error verifying credentials: ' + err.message);
        } finally {
            if (btn) btn.disabled = false;
        }
    },

    showError(msg) {
        const errEl = document.getElementById('vault-error-msg');
        if (errEl) {
            errEl.textContent = msg;
            errEl.classList.remove('hidden');
        }
    },

    async loadFiles(filterType = 'all') {
        const container = document.getElementById('vault-files-grid');
        if (!container) return;

        container.innerHTML = `
            <div class="col-span-full py-12 text-center text-slate-400">
                <i class="fas fa-spinner fa-spin text-2xl mb-2 text-indigo-500"></i>
                <p class="text-sm">Decrypting and indexing engineering vault...</p>
            </div>
        `;

        try {
            const res = await fetch(`/api/vault/files?key=${encodeURIComponent(this.currentKey)}`);
            const data = await res.json();

            if (!data.success) {
                this.showLockedView();
                return;
            }

            this.cachedFiles = data.files || [];
            this.renderFiles(filterType);
            this.updateStats(this.cachedFiles);
        } catch (err) {
            container.innerHTML = `
                <div class="col-span-full p-4 bg-rose-50 text-rose-700 rounded-xl text-center text-sm font-medium">
                    Failed to fetch vault items: ${err.message}
                </div>
            `;
        }
    },

    updateStats(files) {
        const totalCount = document.getElementById('vault-stat-total');
        if (totalCount) totalCount.textContent = files.length;
    },

    filterFiles(type) {
        document.querySelectorAll('.vault-filter-btn').forEach(btn => {
            btn.classList.remove('bg-indigo-600', 'text-white', 'shadow-sm');
            btn.classList.add('bg-slate-100', 'text-slate-600', 'hover:bg-slate-200');
        });
        const activeBtn = document.getElementById(`filter-btn-${type}`);
        if (activeBtn) {
            activeBtn.classList.remove('bg-slate-100', 'text-slate-600', 'hover:bg-slate-200');
            activeBtn.classList.add('bg-indigo-600', 'text-white', 'shadow-sm');
        }
        this.renderFiles(type);
    },

    renderFiles(filterType = 'all') {
        const container = document.getElementById('vault-files-grid');
        if (!container) return;

        let files = this.cachedFiles;
        if (filterType === 'docs') {
            files = files.filter(f => f.name.endsWith('.docx') || f.name.endsWith('.pdf') || f.name.endsWith('.doc'));
        } else if (filterType === 'diagrams') {
            files = files.filter(f => f.name.toLowerCase().includes('eer') || f.name.toLowerCase().includes('diagram') || f.name.endsWith('.png'));
        } else if (filterType === 'sql') {
            files = files.filter(f => f.name.endsWith('.sql'));
        }

        if (files.length === 0) {
            container.innerHTML = `
                <div class="col-span-full py-12 text-center text-slate-400 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl">
                    <i class="fas fa-folder-open text-4xl mb-3 text-slate-300"></i>
                    <p class="text-sm font-semibold text-slate-600">No documents found matching this filter</p>
                    <p class="text-xs text-slate-400 mt-1">Use the upload box below to add new confidential deliverables.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = files.map(f => {
            const icon = this.getFileIcon(f.name);
            const dateStr = new Date(f.last_modified).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            return `
                <div class="p-4 bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md rounded-2xl transition group flex flex-col justify-between">
                    <div class="flex items-start space-x-3 mb-3">
                        <div class="w-10 h-10 rounded-xl ${icon.bg} ${icon.color} flex items-center justify-center text-lg flex-shrink-0">
                            <i class="${icon.icon}"></i>
                        </div>
                        <div class="min-w-0 flex-1">
                            <h4 class="font-bold text-slate-800 text-sm truncate group-hover:text-indigo-600 transition" title="${f.name}">
                                ${f.name}
                            </h4>
                            <p class="text-[11px] text-slate-400 font-mono mt-0.5">
                                ${f.size_formatted} • ${f.type}
                            </p>
                        </div>
                    </div>
                    <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span class="text-[11px] text-slate-400">Updated: ${dateStr}</span>
                        <div class="flex items-center space-x-1.5">
                            <a href="${f.download_url}" target="_blank"
                               class="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white rounded-lg text-xs font-semibold transition flex items-center space-x-1">
                                <i class="fas fa-download text-[10px]"></i>
                                <span>Get</span>
                            </a>
                            <button onclick="VaultModule.deleteFile('${f.name}')" 
                                class="p-1 hover:bg-rose-50 text-slate-300 hover:text-rose-600 rounded-lg text-xs transition" title="Delete">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    },

    getFileIcon(filename) {
        const lower = filename.toLowerCase();
        if (lower.endsWith('.pdf')) return { icon: 'fas fa-file-pdf', color: 'text-rose-600', bg: 'bg-rose-50' };
        if (lower.endsWith('.docx') || lower.endsWith('.doc')) return { icon: 'fas fa-file-word', color: 'text-blue-600', bg: 'bg-blue-50' };
        if (lower.endsWith('.sql')) return { icon: 'fas fa-database', color: 'text-emerald-600', bg: 'bg-emerald-50' };
        if (lower.endsWith('.zip') || lower.endsWith('.rar')) return { icon: 'fas fa-file-archive', color: 'text-amber-600', bg: 'bg-amber-50' };
        if (lower.endsWith('.png') || lower.endsWith('.jpg')) return { icon: 'fas fa-file-image', color: 'text-purple-600', bg: 'bg-purple-50' };
        return { icon: 'fas fa-file-code', color: 'text-indigo-600', bg: 'bg-indigo-50' };
    },

    async handleUpload(event) {
        event.preventDefault();
        const fileInput = document.getElementById('vault-file-upload-input');
        if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
            alert('Please select a file to upload.');
            return;
        }

        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('file', file);

        const uploadBtn = document.getElementById('vault-upload-btn');
        if (uploadBtn) {
            uploadBtn.disabled = true;
            uploadBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-1"></i> Uploading...';
        }

        try {
            const res = await fetch(`/api/vault/upload?key=${encodeURIComponent(this.currentKey)}`, {
                method: 'POST',
                body: formData
            });

            const data = await res.json();
            if (data.success) {
                fileInput.value = '';
                document.getElementById('vault-selected-filename').textContent = 'No file selected';
                await this.loadFiles();
            } else {
                alert('Upload error: ' + data.error);
            }
        } catch (err) {
            alert('Failed to upload file: ' + err.message);
        } finally {
            if (uploadBtn) {
                uploadBtn.disabled = false;
                uploadBtn.innerHTML = '<i class="fas fa-cloud-upload-alt mr-1"></i> Upload to Vault';
            }
        }
    },

    async deleteFile(fileName) {
        if (!confirm(`Are you sure you want to permanently delete '${fileName}' from your secure vault?`)) return;

        try {
            const res = await fetch(`/api/vault/files/${encodeURIComponent(fileName)}?key=${encodeURIComponent(this.currentKey)}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            if (data.success) {
                await this.loadFiles();
            } else {
                alert('Error: ' + data.error);
            }
        } catch (err) {
            alert('Error deleting file: ' + err.message);
        }
    },

    lockVault() {
        this.currentKey = '';
        sessionStorage.removeItem('pawlife_vault_key');
        this.showLockedView();
    }
};

// Initialize module when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    VaultModule.init();
});
