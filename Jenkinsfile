pipeline{
    agent any

    stages{
        stage('Checkout Code'){
            steps{
                echo 'Cloning HR-API-PW-Automation'
                git branch: 'main',
                credentialsId: '34dff8e0-60f0-4084-a1ad-075443b2e658',
                url: 'https://github.com/ysfcntrn/hr-api-automation.git'
            }
        }

    stage('Setup Node Environment'){
        steps{
            sh 'npm ci || npm install'
        }
    }
    stage('Install Playwright Browsers'){
        steps{
            sh 'npx playwright install --with-deps'
        }
    }
    stage('Run Api Tests'){
        steps{
            sh 'npx playwright test'
        }
    }
    stage('Archive Reports'){
        steps{
            archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
        }
    }
    }
        
    post{
        success { echo 'Build SUCCEDED!! -- All api tests pased. '}
        failure {echo 'Build failed.'}
    }

}
