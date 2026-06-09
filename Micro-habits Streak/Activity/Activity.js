
function initActivityPage() {
    console.log('Activity page initialized');
    // Commitments Page Functionality

    class CommitmentsManager {
        constructor() {
            this.commitments = JSON.parse(localStorage.getItem('commitments')) || [];
            this.currentCommitmentId = null;
            this.currentFilter = 'all';
            this.init();
        }

        init() {
            this.setupEventListeners();
            this.render();
        }

        setupEventListeners() {
            // Modal controls
            document.getElementById('openModalBtn').addEventListener('click', () => this.openCommitmentModal());
            document.getElementById('closeModalBtn').addEventListener('click', () => this.closeCommitmentModal());
            document.getElementById('cancelModalBtn').addEventListener('click', () => this.closeCommitmentModal());
            
            document.getElementById('closeStepModalBtn').addEventListener('click', () => this.closeStepModal());
            document.getElementById('cancelStepModalBtn').addEventListener('click', () => this.closeStepModal());

            // Form submissions
            document.getElementById('commitmentForm').addEventListener('submit', (e) => this.handleAddCommitment(e));
            document.getElementById('stepForm').addEventListener('submit', (e) => this.handleAddStep(e));

            // Filter buttons
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', (e) => this.handleFilter(e));
            });
        }

        handleAddCommitment(e) {
            e.preventDefault();
            const title = document.getElementById('commitmentTitle').value.trim();
            const description = document.getElementById('commitmentDescription').value.trim();
            const targetDate = document.getElementById('targetDate').value;
            const type = document.getElementById('commitmentType').value;

            if (title && targetDate && type) {
                const commitment = {
                    id: Date.now(),
                    title,
                    description,
                    targetDate,
                    type,
                    createdDate: new Date().toISOString(),
                    steps: [],
                    completed: false,
                    completedDate: null
                };
                this.commitments.push(commitment);
                this.save();
                this.render();
                this.closeCommitmentModal();
                this.closeCommitmentModal(true);
                this.showNotification('Commitment added successfully!');
            }
        }

        handleAddStep(e) {
            e.preventDefault();
            const stepTitle = document.getElementById('stepTitle').value.trim();
            const stepDescription = document.getElementById('stepDescription').value.trim();
            const stepDueDate = document.getElementById('stepDueDate').value;

            if (stepTitle && this.currentCommitmentId) {
                const commitment = this.commitments.find(c => c.id === this.currentCommitmentId);
                if (commitment) {
                    const step = {
                        id: Date.now(),
                        title: stepTitle,
                        description: stepDescription,
                        dueDate: stepDueDate,
                        completed: false
                    };
                    commitment.steps.push(step);
                    this.save();
                    this.render();
                    this.closeStepModal();
                    this.showNotification('Step added successfully!');
                }
            }
        }

        handleFilter(e) {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            this.currentFilter = e.target.getAttribute('data-filter');
            this.render();
        }

        openCommitmentModal() {
            document.body.style.overflow = 'hidden'; // lock background
            document.getElementById('commitmentModal').classList.add('show');
            document.getElementById('commitmentForm').reset();
        }

        closeCommitmentModal(skipWarning = false) {
            // FIX 5: Warn user if form has unsaved input
            const form = document.getElementById('commitmentForm');
            const hasInput = [...form.querySelectorAll('input, textarea, select')]
                .some(el => el.value.trim() !== '');

                if (!skipWarning && hasInput && !confirm('You have unsaved changes. Are you sure you want to close?')) {
                return;
            }
                
            if (hasInput && !confirm('You have unsaved changes. Are you sure you want to close?')) {
                return;
            }
            document.getElementById('commitmentModal').classList.remove('show');
            form.reset();
        }

        openStepModal(commitmentId) {
            this.currentCommitmentId = commitmentId;
            document.body.style.overflow = 'hidden'; // lock background
            document.getElementById('stepModal').classList.add('show');
            document.getElementById('stepForm').reset();
        }

        closeStepModal() {
            // FIX 5: Warn user if form has unsaved input
            const form = document.getElementById('stepForm');
            const hasInput = [...form.querySelectorAll('input, textarea')]
                .some(el => el.value.trim() !== '');
            if (hasInput && !confirm('You have unsaved changes. Are you sure you want to close?')) {
                return;
            }
            document.getElementById('stepModal').classList.remove('show');
            form.reset();
            this.currentCommitmentId = null;
        }

        toggleStep(commitmentId, stepId) {
            const commitment = this.commitments.find(c => c.id === commitmentId);
            if (commitment) {
                const step = commitment.steps.find(s => s.id === stepId);
                if (step) {
                    step.completed = !step.completed;
                    this.save();
                    this.render();
                }
            }
        }

        deleteStep(commitmentId, stepId) {
            const commitment = this.commitments.find(c => c.id === commitmentId);
            if (commitment) {
                commitment.steps = commitment.steps.filter(s => s.id !== stepId);
                this.save();
                this.render();
            }
        }

        toggleCommitmentCompletion(commitmentId) {
            const commitment = this.commitments.find(c => c.id === commitmentId);
            if (commitment) {
                commitment.completed = !commitment.completed;
                commitment.completedDate = commitment.completed ? new Date().toISOString() : null;
                this.save();
                this.render();
                this.showNotification(commitment.completed ? 'Commitment completed! 🎉' : 'Commitment marked as incomplete');
            }
        }

        deleteCommitment(commitmentId) {
            if (confirm('Are you sure you want to delete this commitment?')) {
                this.commitments = this.commitments.filter(c => c.id !== commitmentId);
                this.save();
                this.render();
                this.showNotification('Commitment deleted');
            }
        }

        getFilteredCommitments() {
            if (this.currentFilter === 'all') {
                return this.commitments.filter(c => !c.completed);
            } else if (this.currentFilter === 'completed') {
                return this.commitments.filter(c => c.completed);
            } else {
                return this.commitments.filter(c => c.type === this.currentFilter && !c.completed);
            }
        }

        getCompletionPercentage(commitment) {
            if (commitment.steps.length === 0) return 0;
            const completedSteps = commitment.steps.filter(s => s.completed).length;
            return (completedSteps / commitment.steps.length) * 100;
        }

        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        }

        getTimeRemaining(targetDate) {
            const now = new Date();
            const target = new Date(targetDate);
            const diffTime = target - now;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays < 0) return 'Overdue';
            if (diffDays === 0) return 'Due today';
            if (diffDays === 1) return 'Due tomorrow';
            return `${diffDays} days left`;
        }

        render() {
            const commitmentsList = document.getElementById('commitmentsList');
            const emptyState = document.getElementById('emptyState');
            const filteredCommitments = this.getFilteredCommitments();

            commitmentsList.innerHTML = '';

            // FIX 4: Context-aware empty state message
            if (filteredCommitments.length === 0) {
                emptyState.style.display = 'block';
                const emptyMsg = emptyState.querySelector('p');
                emptyMsg.textContent = this.currentFilter === 'all'
                    ? 'No commitments yet. Start by adding your first commitment!'
                    : `No ${this.currentFilter} commitments found.`;
                return;
            }

            emptyState.style.display = 'none';

            filteredCommitments.forEach(commitment => {
                const card = document.createElement('div');
                card.className = 'commitment-card';

                const completion = this.getCompletionPercentage(commitment);
                const badge = commitment.type === 'short-term' ? 'badge-short-term' : 'badge-long-term';
                const badgeText = commitment.type === 'short-term' ? 'Short-term' : 'Long-term';
                const timeRemaining = this.getTimeRemaining(commitment.targetDate);

                // Card header
                const header = document.createElement('div');
                header.className = 'commitment-card-header';
                header.innerHTML = `
                    <h3 class="commitment-title">${this.escapeHtml(commitment.title)}</h3>
                    <div class="commitment-meta">
                        <span class="commitment-badge ${badge}">${badgeText}</span>
                    </div>
                `;
                card.appendChild(header);

                // Description
                if (commitment.description) {
                    const desc = document.createElement('p');
                    desc.className = 'commitment-description';
                    desc.textContent = commitment.description;
                    card.appendChild(desc);
                }

                // Progress
                const progress = document.createElement('div');
                progress.className = 'commitment-progress';
                progress.innerHTML = `
                    <div class="progress-label">
                        <span>Progress</span>
                        <span>${Math.round(completion)}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${completion}%"></div>
                    </div>
                `;
                card.appendChild(progress);

                // Date row
                const dateRow = document.createElement('div');
                dateRow.style.cssText = 'display:flex; justify-content:space-between; margin-bottom:1rem; font-size:0.9rem; color:#666;';
                dateRow.innerHTML = `
                    <span>Target: ${this.formatDate(commitment.targetDate)}</span>
                    <span>${timeRemaining}</span>
                `;
                card.appendChild(dateRow);

                // FIX 2: Steps built with addEventListener, no inline onclick
                if (commitment.steps.length > 0) {
                    const stepsSection = document.createElement('div');
                    stepsSection.className = 'steps-section';

                    const stepsTitle = document.createElement('div');
                    stepsTitle.className = 'steps-title';
                    stepsTitle.textContent = `Steps (${commitment.steps.filter(s => s.completed).length}/${commitment.steps.length} completed)`;
                    stepsSection.appendChild(stepsTitle);

                    const stepsList = document.createElement('div');
                    stepsList.className = 'steps-list';

                    commitment.steps.forEach(step => {
                        const stepItem = document.createElement('div');
                        stepItem.className = 'step-item';

                        const checkbox = document.createElement('input');
                        checkbox.type = 'checkbox';
                        checkbox.className = 'step-checkbox';
                        checkbox.checked = step.completed;
                        checkbox.addEventListener('change', () => this.toggleStep(commitment.id, step.id));

                        const stepContent = document.createElement('div');
                        stepContent.className = 'step-content';

                        const stepText = document.createElement('p');
                        stepText.className = `step-text${step.completed ? ' completed' : ''}`;
                        stepText.textContent = step.title;
                        stepContent.appendChild(stepText);

                        if (step.dueDate) {
                            const stepDue = document.createElement('p');
                            stepDue.className = 'step-due';
                            stepDue.textContent = `Due: ${this.formatDate(step.dueDate)}`;
                            stepContent.appendChild(stepDue);
                        }

                        const deleteStepBtn = document.createElement('button');
                        deleteStepBtn.type = 'button';
                        deleteStepBtn.className = 'btn-action';
                        deleteStepBtn.style.color = '#e74c3c';
                        deleteStepBtn.textContent = 'Delete';
                        deleteStepBtn.addEventListener('click', () => this.deleteStep(commitment.id, step.id));

                        stepItem.appendChild(checkbox);
                        stepItem.appendChild(stepContent);
                        stepItem.appendChild(deleteStepBtn);
                        stepsList.appendChild(stepItem);
                    });

                    stepsSection.appendChild(stepsList);
                    card.appendChild(stepsSection);
                }

                // FIX 2: Action buttons with addEventListener, no inline onclick
                const actions = document.createElement('div');
                actions.className = 'commitment-actions';

                const addStepBtn = document.createElement('button');
                addStepBtn.type = 'button';
                addStepBtn.className = 'btn-action';
                addStepBtn.textContent = '+ Add Step';
                addStepBtn.addEventListener('click', () => this.openStepModal(commitment.id));

                const toggleBtn = document.createElement('button');
                toggleBtn.type = 'button';
                toggleBtn.className = 'btn-action';
                toggleBtn.textContent = `Mark as ${commitment.completed ? 'Incomplete' : 'Complete'}`;
                toggleBtn.addEventListener('click', () => this.toggleCommitmentCompletion(commitment.id));

                const deleteBtn = document.createElement('button');
                deleteBtn.type = 'button';
                deleteBtn.className = 'btn-action btn-delete';
                deleteBtn.textContent = 'Delete';
                deleteBtn.addEventListener('click', () => this.deleteCommitment(commitment.id));

                actions.appendChild(addStepBtn);
                actions.appendChild(toggleBtn);
                actions.appendChild(deleteBtn);
                card.appendChild(actions);

                commitmentsList.appendChild(card);
            });
        }

        save() {
            localStorage.setItem('commitments', JSON.stringify(this.commitments));
        }

        showNotification(message) {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 6px;
                box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
                z-index: 2000;
                animation: slideUp 0.3s ease-out;
            `;
            notification.textContent = message;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.animation = 'slideDown 0.3s ease-in';
                setTimeout(() => notification.remove(), 300);
            }, 2000);
        }

        escapeHtml(text) {
            const map = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            };
            return text.replace(/[&<>"']/g, m => map[m]);
        }
    }


    // Initialize the manager when DOM is ready
    const manager = new CommitmentsManager();


    // Close modals when clicking outside
    window.addEventListener('click', (event) => {
        const commitmentModal = document.getElementById('commitmentModal');
        const stepModal = document.getElementById('stepModal');
        
        if (event.target === commitmentModal) {
            manager.closeCommitmentModal();
        }
        if (event.target === stepModal) {
            manager.closeStepModal();
        }
    });
}
