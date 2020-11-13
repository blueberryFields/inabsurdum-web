package online.inabsurdum.jambox.user;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ReducedUserDTO {

    private Long id;
    private String username;
    private String bandName;
    private String jwt;

    ReducedUserDTO(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.bandName = user.getBandName();
    }
}
