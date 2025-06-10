trigger:
  branches:
    include:
      - main

pool:
  vmImage: 'windows-latest'

variables:
  buildConfiguration: 'Release'
  solution: '**/Ochoa.sln'
  project: '**/Ochoa.Package/Ochoa.Package.wapproj'
  outputPath: '$(Build.ArtifactStagingDirectory)/AppPackages'

steps:
  - task: NodeTool@0
    inputs:
      versionSpec: '18.x'
    displayName: 'Install Node.js'

  - script: |
      yarn install
    displayName: 'Install dependencies'

  - task: VSBuild@1
    inputs:
      solution: '$(solution)'
      configuration: '$(buildConfiguration)'
      msbuildArgs: '/p:Platform=x64 /p:UapAppxPackageBuildMode=SideloadOnly /p:AppxBundle=Always /p:AppxBundlePlatforms="x64" /p:GenerateAppInstallerFile=False /p:AppxPackageDir="$(outputPath)\\"'
      vsVersion: '17.0'
    displayName: 'Build UWP App Package'

  - task: PublishBuildArtifacts@1
    inputs:
      PathtoPublish: '$(outputPath)'
      ArtifactName: 'app-drop'
      publishLocation: 'Container'