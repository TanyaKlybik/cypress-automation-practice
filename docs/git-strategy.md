# Git Strategy

## Branching Strategy: Main & Feature Branches

1. **Main Branch**:

   - `main` is the stable branch, always containing the latest working version.
   - All releases are made from `main`.
   - `main` is protected — **direct commits are not allowed**. All changes must go through a Pull Request (PR).

2. **Feature Branches**:

   - Create a new branch for each task from `main`.
   - Use descriptive names, e.g., `feature/user-login`.

3. **Workflow**:

   - **Step 1**: Update `main`:

     ```bash
     git checkout main
     git pull origin main
     ```

   - **Step 2**: Create a feature branch:

     ```bash
     git checkout -b feature/my-feature
     ```

   - **Step 3**: Work on the feature and commit changes:

     ```bash
     git add .
     git commit -m "Add user login feature"
     git push origin feature/my-feature
     ```

   - **Step 4**: Create a Pull Request:

     - After pushing the feature branch, open a PR to merge it into `main`.
     - Provide a clear description of the changes.
     - At least **1 approval** is required before merging.

   - **Step 5**: (Optional) Sync with `main` regularly:

     ```bash
     git checkout main
     git pull origin main
     git checkout feature/my-feature
     git merge main
     ```

   - **Step 6**: Merge the PR:
     - Use **squash merge** only (merge commits and rebase are disabled).
     - The source branch will be **automatically deleted** after merging.

4. **Summary**:
   - `main` contains stable code.
   - All changes go through a PR with at least one approval.
   - Only squash merges are allowed.
   - Feature branches are deleted automatically after merge.
