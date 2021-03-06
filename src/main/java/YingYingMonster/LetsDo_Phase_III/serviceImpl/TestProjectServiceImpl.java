package YingYingMonster.LetsDo_Phase_III.serviceImpl;

import YingYingMonster.LetsDo_Phase_III.entity.*;
import YingYingMonster.LetsDo_Phase_III.entity.event.CommitEvent;
import YingYingMonster.LetsDo_Phase_III.model.ProjectState;
import YingYingMonster.LetsDo_Phase_III.repository.*;
import YingYingMonster.LetsDo_Phase_III.repository.event.CommitEventRepository;
import YingYingMonster.LetsDo_Phase_III.service.ImageService;
import YingYingMonster.LetsDo_Phase_III.service.ProjectService;
import YingYingMonster.LetsDo_Phase_III.service.TestProjectService;
import YingYingMonster.LetsDo_Phase_III.service.TextNodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class TestProjectServiceImpl implements TestProjectService {

    @Autowired
    TestProjectRepository testProjectRepository;

    @Autowired
    ImageRepository imageRepository;

    @Autowired
    TagRepository tagRepository;

    @Autowired
    ImageService imageService;

    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    ProjectService projectService;

    @Autowired
    CommitEventRepository commitEventRepository;

    @Override
    public TestProject addTestProject(long projectId, MultipartFile multipartFile) {
        TestProject testProject = new TestProject();
        Project project = projectRepository.findById(projectId);
        testProject.setMarkMode(project.getType());

        testProject.setProject(project);
        testProject = testProjectRepository.saveAndFlush(testProject);

        int picNum = imageService.saveImages(multipartFile, testProject.getId(),true);
        testProject.setPicNum(picNum);
        testProject.setInviteCode(generateUUID());
        testProject = testProjectRepository.saveAndFlush(testProject);
        projectRepository.updateTestProject(projectId, testProject);

        return testProject;
    }

    private String generateUUID(){
        String uuid = UUID.randomUUID().toString().replaceAll("-", "");
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 8; i++) {
            int index = (int) (Math.random() * 4);
            sb.append(uuid.substring(i, i + 4).charAt(index));
        }
        
        return sb.toString();
    }

    @Override
    /**
     * 查看下一页未完成的测试集图片
     */
    public List<Image> getAPageOfImages(int pageId, long testProjectId) {
        return imageRepository.findByProjectIdAndIsFinishedFalseAndIsTestTrue(testProjectId);
    }
    
    @Override
    public List<Image> getAllTestImages(int testProjectId) {
        return imageRepository.findByProjectId(testProjectId);
    }

    @Override
    public Tag uploadAnswer(long workerId,Tag tag) {
        long imageId = tag.getImageId();
        imageRepository.updateIsFinished(imageId, true);
        tag.setResult(true);
        tag = tagRepository.saveAndFlush(tag);
//        recordCommitEvent(tag);
        return tag;
    }

//    private void recordCommitEvent(Tag tag) {
//        CommitEvent commitEvent = new CommitEvent(tag.getWorkerId(), tag.getProjectId(), tag.getId(),
//                tag.getImageId(), new Date());
//        commitEventRepository.saveAndFlush(commitEvent);
//    }

    @Override
    public TestProject getTestProjectByInviteCode(String inviteCode) {
        return testProjectRepository.findByInviteCode(inviteCode);
    }

    @Override
    public List<Tag> viewAnswers(long testProjectId) {
        /**
         * 上传测试集的时候已经把testproject的id放到image对象了，因此tag对象也拥有testproject的id
         * testproject id 与project id不会重复
         */
        return tagRepository.findByProjectId(testProjectId);
    }

    @Override
    public String viewTagRequirement(long testProjectId) {
        return testProjectRepository.findById(testProjectId).getProject().getTagRequirement();
    }

    @Override
    public void finishMakingAnswer(long testProjectId) {
        Project project = testProjectRepository.findById(testProjectId).getProject();
        projectRepository.updateProjectState(project.getId(), ProjectState.ready);
    }

    @Override
    public List<TextNode> getTextLabel(long testProjectId) {
        Project pr=testProjectRepository.findById(testProjectId).getProject();
        return projectService.getProjectTextNode(pr.getId());
    }

    @Override
    public long getProjectPublisherId(long testProjectId) {
        return testProjectRepository.findById(testProjectId).getProject().getPublisherId();
    }

    @Override
    public long getTrueProjectId(long testProjectId) {
        return testProjectRepository.findById(testProjectId).getProject().getId();
    }
}
