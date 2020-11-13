package online.inabsurdum.jambox.user;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {

    boolean existsUserByUsername(String userName);

    User findByUsername(String userName);

    User findOneByUsername(String userName);
}
