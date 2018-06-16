package YingYingMonster.LetsDo_Phase_III.serviceImpl;

import YingYingMonster.LetsDo_Phase_III.entity.*;
import YingYingMonster.LetsDo_Phase_III.entity.event.JoinEvent;
import YingYingMonster.LetsDo_Phase_III.entity.role.User;
import YingYingMonster.LetsDo_Phase_III.entity.role.Worker;
import YingYingMonster.LetsDo_Phase_III.repository.AbilityRepository;
import YingYingMonster.LetsDo_Phase_III.repository.ImageRepository;
import YingYingMonster.LetsDo_Phase_III.repository.event.JoinEventRepository;
import YingYingMonster.LetsDo_Phase_III.repository.TagRepository;
import YingYingMonster.LetsDo_Phase_III.service.ProjectService;
import YingYingMonster.LetsDo_Phase_III.service.UserService;
import YingYingMonster.LetsDo_Phase_III.service.WorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class WorkerServiceImpl implements WorkerService {

	@Autowired
	ProjectService projectService;

	@Autowired
	UserService userService;

	@Autowired
	JoinEventRepository joinEventRepository;

	@Autowired
	TagRepository tagRepository;

	@Autowired
	ImageRepository imageRepository;

	@Autowired
	AbilityRepository abilityRepository;


	@Override
	public List<Project> discoverProjects(long workerId) {
		//获得worker的能力、偏好等数据
		User user = userService.getUser(workerId);

		List<Ability> abilities = abilityRepository.findByUser(user);
		List<String>labelNames=abilities.stream().sorted((x, y) -> {
			if (x.getAccuracy() > y.getAccuracy() ||
					x.getAccuracy() == y.getAccuracy() && x.getBias() > y.getBias()) {
				return -1;
			} else {
				if (x.getAccuracy() == y.getAccuracy() && x.getBias() == y.getBias()) {
					return 0;
				} else {
					return 1;
				}
			}
		}).map(x -> x.getLabel().getName()).collect(Collectors.toList());

//		for (String s : labelNames) {
//			System.out.println(s);
//		}
		System.out.println(labelNames);
		
		return projectService.viewAllProjects(labelNames);
	}

	@Override
	public Project getAProject(long projectId) {
		return projectService.getAProject(projectId);
	}

	@Override
	public List<Project> viewMyProjects(long workerId, String key) {
		String k = key == null ? "" : key;
//		return projectService.findWorkerProjects(workerId, k);
		return joinEventRepository.findByWorkerId(workerId).stream()
				.map(x -> projectService.getAProject(x.getProjectId()))
				.filter(x->(x.getProjectName().contains(k)||x.getTagRequirement().contains(k)))
				.collect(Collectors.toList());
	}

	@Override
	public List<Project> viewMyActiveProjects(long workerId, String key) {
		String k = key == null ? "" : key;
		return joinEventRepository.findByWorkerIdAndActiveTrue(workerId).stream()
				.map(x -> projectService.getAProject(x.getProjectId()))
				.filter(x->(x.getProjectName().contains(k)||x.getTagRequirement().contains(k)))
				.collect(Collectors.toList());
	}

	@Override
	public List<JoinEvent> viewMyJoinHistory(long workerId) {
		return joinEventRepository.findByWorkerId(workerId);
	}


	@Override
	public int joinProject(long workerId, long projectId) {
		Project project = projectService.getAProject(projectId);
		Worker worker = (Worker) userService.getUser(workerId);

		if (worker.getLevel() < project.getWorkerMinLevel()) {  //level limit not satisfied
			return -1;
		}
		if (false) {  //no access to the project
			return -2;
		}

		JoinEvent joinEvent = joinEventRepository.findByWorkerIdAndProjectId(workerId, projectId);
		if (joinEvent == null) {
			joinEvent = new JoinEvent(workerId, projectId, new Date(), true);
			joinEventRepository.saveAndFlush(joinEvent);
		} else {
			if (!joinEvent.isActive()) {
				joinEvent.setActive(true);
				joinEventRepository.saveAndFlush(joinEvent);
			}
		}
		return 0;
	}

	@Override
	public void quitProject(long workerId, long projectId) {
		JoinEvent joinEvent = joinEventRepository.findByWorkerIdAndProjectId(workerId, projectId);
		joinEvent.setActive(false);
		joinEventRepository.saveAndFlush(joinEvent);
	}

	@Override
	public Tag uploadTag(Tag tag) {

		Tag tag1 = tagRepository.findByWorkerIdAndImageId(tag.getWorkerId(), tag.getImageId());

		if (tag1 != null) {
			tag1.setData(tag.getData());
			tag1.setXmlFile(tag.getXmlFile());
			tag1=tagRepository.saveAndFlush(tag1);
		} else {
			tag1=tagRepository.saveAndFlush(tag);
		}
		return tag1;
	}

	@Override
	public List<Image> getAPageOfImage(long projectId, int pageId) {
		return imageRepository
				.findByProjectIdAndIsFinishedFalseAndIsTestFalse(projectId, PageRequest.of(pageId, 5))
				.stream().collect(Collectors.toList());

	}

	@Override
	public List<Tag> viewTags(long workerId, long projectId) {
		return tagRepository.findByWorkerIdAndProjectId(workerId, projectId);
	}


}
