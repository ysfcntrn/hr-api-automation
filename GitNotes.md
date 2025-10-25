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

**Untracking unwanted files**
```bash
git reset fileName
```
**Untrack(Reverse git add) for all**
```bash
git reset
```

## Step 4: Commit your changes
Once you complete all changes for your work, and will not do an additional change
you could commit. 
```bash
git commit -m "Message is always a must"
```

## Step 5: Link Your Local Repo to A Remote Repository
- You will create a repository space on the GitHub(or Bitbucket)
- Then 
```bash
git remote add remoteName remoteRepoLink
```

## Step 6: For the first time you must create a MAIN branch for your remote repo
```bash
git branch -M main
```
-- main doesn't have to be main, you could name your MAIN branch howevery you want

## Step 7: Push Commited Changes to The Remote Repository
```bash
git push -u origin main
```
- origin is a remote repo name from step 5, main is a main branch name from step 6


## Additional Way To Authenticate Without Username and Password/PAT

1. Get your PAT with necessary permissions
2. When adding a remote repository, 
add your PAT at the beginning of the remote repo url.
3. Know that, github url is always in the format of 
*https://github.com/your-username/your-reponame.git*
4. Add your personal access token(PAT) to url
**https://PAT@github.com/your-username/your-reponame.git**


# Git & GitHub Practice 

## 1. Check Repository & Remotes
Git stores your code locally, but you can connect to remote repository like Github
and share on that platform.

### Common Commands 
```bash
git remote -v
```
Shows connected remotes on the git repository. 

```bash
git remote add origin yourRepoLink
```
Adds a remote called `origin`. It doesn't have to be named origin
however, it is commonly used for remote repo names. 

```bash
git remote remove origin
```
Deletes the remote connection named origin. 

```bash
git remote rename origin mainRepo
```
Command above renames the remote named `origin` to `mainRepo`.


## 2. Check Status & Staging
Git has 3 areas:
    1. Working directory -> Your real files
    2. Staging area      -> Files ready to be committed
    3. Repository        -> History of committed changes 

### Commands
```bash
git status
```
Shows which files are modified,, new, or staged since the last commit. 
```bash
git add file/folderName # For individually selecting to add
git add -A  # for including all changes
```
It stages the files and all the files/folders in staging area will be included in next 
commit. 
```bash
git reset file/foldername # Removes the files/folders from staging area so that 
# they will not be included in the next commit. 
```

