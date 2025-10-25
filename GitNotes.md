# Git
Git is a version control system that helps track changes in code and allows multiple people to collaborate on the same project efficiently. 

# What is GitHub? 
GitHub is a cloud based platform that hosts your Git repositories. 
It adds collaboration, sharing, and security features on top of Git. 
GitHub allows you to:
    * Store your repositories online. 
    * Share your code publicy, privately, or within an organization. 
    * Manage pull requests and issues. 
    * Work directly from your browser or tools like GitHub desktop, VsCode, Terminal etc. 

### How Git Works (Simple Flow)
Git has 3 main areas: 
1. Working Directory(Local) -> Where you edit your files(your project directory.)
2. Staging Area(Index) -> Where you prepare your files to be commited. 
3. Repository(Local Git Repo) -> Where commited versions are stored. 
4. GitHub Repo(Remote Repository) -> Local commits(changes) are sent here. 

## Setup & Authentication

### 1. Configure Git
```bash
# Check if the git is installled
git --version

# Set your global username and email
git config --global user.name "Your User Name"
git config --global user.email "Your Email" 
```
### 2. Authenticate with GitHub(Using Personal Access Token)
When you clone or push to GitHub for the first time, you'll need to authenticate. 

##### Steps: 
1. Go to **GitHub -> Settings -> Developer Settings -> Personal Access Token -> Tokens(classic)**
2. Click generate new token and choose your scope.
3. Copy the generated token, it shows only once. 

**Note**: 
Use the Token instead of Password, use github username and paste your personal access token. 

## Git Commands with Step-by-Step Workflow
 
### Step 1 -> Initialize your Project Directory As a Git Directory
```bash
git init
```

## Step 2(Optional-you can use this command any time) Check the Status of Files
```bash
git status
```

## Step 3: Add Files to Staging Area
- Telling git which files/folders it should track
- If you have so many changes and you want to track all of them 
```bash
git add -A
```
-- If you want to individually add 
```bash
git add fileName
```
-- Track all changes in the direactory
```bash
git add directoryName
```