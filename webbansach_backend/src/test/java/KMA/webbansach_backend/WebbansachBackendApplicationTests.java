package KMA.webbansach_backend;

import KMA.webbansach_backend.entity.TheLoai;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class WebbansachBackendApplicationTests {

	@Test
	void contextLoads() {
		TheLoai theLoai = new TheLoai();
		theLoai.setTenTheLoai("test");
		System.out.println(theLoai.getTenTheLoai().toString());
	}

}
