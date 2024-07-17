package vn.titv.webbansach_backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "secret_key")
public class SecretKey {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String secretKey;
    @OneToOne(cascade = CascadeType.ALL)
    private NguoiDung nguoiDung;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Date creationTime;
    public SecretKey(String secretKey, NguoiDung nguoiDung, Date creationTime) {
        this.secretKey = secretKey;
        this.nguoiDung = nguoiDung;
        this.creationTime = creationTime;
    }
    public SecretKey() {

    }
}
