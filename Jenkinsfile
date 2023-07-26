pipeline {
    agent any

    environment {
        NEXUS_VERSION = "nexus3"
        NEXUS_PROTOCOL = "http"
        NEXUS_URL = "192.168.33.10:8081"
        NEXUS_REPOSITORY = "npm-releases/"  // Update with your Nexus repository name
        NEXUS_USERNAME = "admin"
        NEXUS_PASSWORD = "admin"
        ANGULAR_ENV = "production"
    }

    stages {
        stage('Git') {
            steps {
                git branch: 'master', url: 'https://github.com/F3dyGH/Wevioo-FrontEnd.git',
                credentialsId: 'password'
            }
        }
/*
        stage('Install Dependencies') {
            steps {
                sh "npm install"
            }
        }

        stage('Run Tests') {
            steps {
                sh "npm test"
            }
        }
stage('Clean Build Environment') {
    steps {
        sh 'npm ci'
    }
}
*/
        stage('Build Angular App') {
            steps {
                sh "npm run build -- --configuration=${ANGULAR_ENV}"
                // sh "npm run build --named-chunks"
            }
        }

       /*stage('Publish Angular Artifacts to Nexus') {
            steps {
                script {
                    // Define the Nexus repository URL and credentials
                    def nexusUrl = "http://192.168.33.10:8081/repository/npm-releases"
                    def nexusUsername = "admin"
                    def nexusPassword = "admin"

                    // Set the version of your Angular application (replace with your actual version)
                    def angularVersion = "1.0.0"

                    // Define the file paths for the artifacts to publish
                    def artifactPaths = [

                       "dist/cantine-ng/index.html",  // Add other artifact paths as needed
                        "dist/cantine-ng/main.*.js",
                        "dist/cantine-ng/src_app_user_user_module_ts.*.js",
                        "dist/cantine-ng/src_app_staff-panel_staff-panel_module_ts.*.js",
                        "dist/cantine-ng/styles.*.css"
                        // Add other artifact paths if needed
                    ]

                    // Publish each artifact to Nexus
                    artifactPaths.each { artifactPath ->
                        def fileName = artifactPath.substring(artifactPath.lastIndexOf("/") + 1)
                        def artifactUrl = "${nexusUrl}/cantine-ng/${fileName}"

                        sh "curl -v -u ${nexusUsername}:${nexusPassword} --upload-file ${artifactPath} ${artifactUrl}"
                    }

                    // Publish the index.html file to Nexus (optional)
                    sh "curl -v -u ${nexusUsername}:${nexusPassword} --upload-file dist/cantine-ng/index.html ${nexusUrl}/index.html"
                }
            }
        }
        stage("Build Docker Image") {
            steps {
                script {
                    sh "docker build -t angular-app:latest ."
                    sh "docker tag angular-app:latest 192.168.33.10:8082/repository/docker-images/angular-app:latest"
                }
            }
        }

        stage("Publish Docker Image to Nexus") {
            steps {
                script {
                    sh "docker login -u admin -p admin 192.168.33.10:8082"
                    sh "docker push 192.168.33.10:8082/repository/docker-images/angular-app:latest"
                }
            }
        }

        stage("Run Docker Compose") {
            steps {
                sh "docker-compose -f docker-compose.yml up -d"
            }
        }*/
          stage('Push to Nexus Repository') {
    steps {
        script {
            // Deploy the built artifacts to Nexus repository
            sh "curl -v -u ${NEXUS_USERNAME}:${NEXUS_PASSWORD} --upload-file dist/cantine-ng/3rdpartylicenses.txt ${NEXUS_URL}/repository/${NEXUS_REPOSITORY}cantine-ng/${ANGULAR_ENV}/"
            //sh "curl -v -u ${NEXUS_USERNAME}:${NEXUS_PASSWORD} --upload-file dist/cantine-ng/451.2639587533b789c1.js ${NEXUS_URL}/repository/${NEXUS_REPOSITORY}cantine-ng/${ANGULAR_ENV}/"
            //sh "curl -v -u ${NEXUS_USERNAME}:${NEXUS_PASSWORD} --upload-file dist/cantine-ng/489.98712ccb4f06d843.js ${NEXUS_URL}/repository/${NEXUS_REPOSITORY}cantine-ng/${ANGULAR_ENV}/"
            // Add other artifacts here with the same pattern
            // For example:
            sh "curl -v -u ${NEXUS_USERNAME}:${NEXUS_PASSWORD} --upload-file dist/cantine-ng/index.html ${NEXUS_URL}/repository/${NEXUS_REPOSITORY}cantine-ng/${ANGULAR_ENV}/"
            sh "curl -v -u ${NEXUS_USERNAME}:${NEXUS_PASSWORD} --upload-file dist/cantine-ng/main.*.js ${NEXUS_URL}/repository/${NEXUS_REPOSITORY}cantine-ng/${ANGULAR_ENV}/"
            sh "curl -v -u ${NEXUS_USERNAME}:${NEXUS_PASSWORD} --upload-file dist/cantine-ng/styles.*.css ${NEXUS_URL}/repository/${NEXUS_REPOSITORY}cantine-ng/${ANGULAR_ENV}/"
        }
    }
}
stage("Build Docker image") {
    steps {
        script {
            def githubRepo = "F3dyGH/Wevioo-FrontEnd" // Replace with your GitHub repository in the format "username/repo"
            def githubBranch = "master" // Replace with the branch name containing the Angular project
            def githubToken = "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N" // Replace with the GitHub API token you generated

            // Fetch package.json content from GitHub repository
           /* def packageJsonContent = sh(
                script: "curl -H 'Authorization: token ${githubToken}' -H 'Accept: application/vnd.github.v3.raw' https://raw.githubusercontent.com/${githubRepo}/${githubBranch}/package.json",
                returnStdout: true
            ).trim()
echo "${packageJsonContent}"*/
                def projectVersion = sh(script: 'node -p "require(\'./package.json\').version"', returnStdout: true).trim()
echo "${projectVersion}"
            // Parse package.json content to get the version
           /* def angularVersion = new groovy.json.JsonSlurper().parseText(packageJsonContent).version.replaceAll('"', '\\"')
            */

            sh "docker build -t clientside-builder -f Dockerfile.build ."
            sh "docker build -t clientside:${projectVersion} ."
            sh "docker tag clientside:${projectVersion} 192.168.33.10:8082/repository/docker-images/clientside-app:${angularVersion}"
        }
    }
}

    }
}
