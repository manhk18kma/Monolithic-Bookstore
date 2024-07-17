//package vn.titv.webbansach_backend.config;
//
//import jakarta.persistence.EntityManager;
//import jakarta.persistence.metamodel.Type;
//import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
//import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
//import org.springframework.stereotype.Component;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//
//
//@Component
//public class RestConfig implements RepositoryRestConfigurer {
//
//    private EntityManager entityManager;
//    public RestConfig(EntityManager entityManager) {
//        this.entityManager = entityManager;
//    }
//
//    @Override
//    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
//        config.exposeIdsFor(entityManager.getMetamodel().getEntities().stream().map(Type::getJavaType).toArray(Class[]::new));
//        // Additional configuration if needed
//    }
//
//
//}
