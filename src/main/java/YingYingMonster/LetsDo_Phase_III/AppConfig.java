package YingYingMonster.LetsDo_Phase_III;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@Configuration
public class AppConfig {

	@Bean
	public String string(){
		return System.getProperty("user.home").replaceAll("\\\\", "/")+"/database";
	}

	//

}
