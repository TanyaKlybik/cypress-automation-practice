## Branching Strategy: Main & Feature Branches

1. **Main Branch**:
    - **Main** is the stable branch, always containing the latest working version.
    - All releases come from **main**.

2. **Feature Branches**:
    - Create a new branch for each feature from **main**.
    - Feature branches should have descriptive names, e.g., `feature/user-login`.
    - Once the feature is complete, create a **pull request** to merge it back into **main**.

3. **Workflow**:

    - **Step 1**: Update **main**:
      ```bash
      git checkout main
      git pull origin main
      ```

    - **Step 2**: Create a feature branch:
      ```bash
      git checkout -b feature/my-feature
      ```

    - **Step 3**: Work on the feature, commit changes:
      ```bash
      git add .
      git commit -m "Add user login feature"
      git push origin feature/my-feature
      ```

    - **Step 4**: Create a **pull request**:
        - After pushing the feature branch, go to your repository on GitHub.
        - Open a **pull request** to merge your feature branch into **main**.
        - Provide a clear description of the changes.

    - **Step 5**: Sync with **main** regularly:
      ```bash
      git checkout main
      git pull origin main
      git checkout feature/my-feature
      git merge main
      ```

    - **Step 6**: Merge the pull request when approved:
        - After the pull request is reviewed and approved, merge it into **main**.

    - **Step 7**: Delete the feature branch:
      ```bash
      git branch -d feature/my-feature
      git push origin --delete feature/my-feature
      ```

4. **Summary**:
    - **Main** contains stable code.
    - Create feature branches for each new task.
    - Open a **pull request** to merge feature branches into **main**.
    - Merge the pull request when approved.