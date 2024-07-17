package KMA.webbansach_backend.Endpoints;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import KMA.webbansach_backend.filter.JwtFilter;

import java.util.Arrays;

@Configuration
public class SecurityConfiguration {
    @Autowired
    private JwtFilter jwtFilter;
    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(
                config -> config
                        .requestMatchers(HttpMethod.GET , Endpoints.PUBLIC_GET_ENDPOINTS).permitAll()
                        .requestMatchers(HttpMethod.POST , Endpoints.PUBLIC_POST_ENDPOINTS).permitAll()
                        .requestMatchers(HttpMethod.PUT , Endpoints.PUBLIC_PUT_ENDPOINTS).permitAll()
                        .requestMatchers(HttpMethod.DELETE , Endpoints.PUBLIC_DELETE_ENDPOINTS).permitAll()

                        .requestMatchers(HttpMethod.GET , Endpoints.USER_GET_ENDPOINTS).hasAnyAuthority("ADMIN" , "USER")
                        .requestMatchers(HttpMethod.POST , Endpoints.USER_POST_ENDPOINTS).hasAnyAuthority("ADMIN" , "USER")
                        .requestMatchers(HttpMethod.PUT , Endpoints.USER_UPDATE_ENDPOINTS).hasAnyAuthority("ADMIN" , "USER")
                        .requestMatchers(HttpMethod.DELETE , Endpoints.USER_DELETE_ENDPOINTS).hasAnyAuthority("ADMIN" , "USER")

                        .requestMatchers(HttpMethod.GET, Endpoints.ADMIN_GET_ENDPOINTS).hasAnyAuthority("ADMIN")
                      .requestMatchers(HttpMethod.POST, Endpoints.ADMIN_POST_ENDPOINTS).hasAnyAuthority("ADMIN")
                        .requestMatchers(HttpMethod.PUT,Endpoints.ADMIN_UPDATE_ENDPOINTS).hasAnyAuthority("ADMIN")
                        .requestMatchers(HttpMethod.DELETE,Endpoints.ADMIN_DELETE_ENDPOINTS).hasAnyAuthority("ADMIN")
        );
        http.cors(cors -> {
            cors.configurationSource(request -> {
                CorsConfiguration corsConfig = new CorsConfiguration();
                corsConfig.addAllowedOrigin(Endpoints.FRONT_END_HOST);
                corsConfig.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
                corsConfig.addAllowedHeader("*");
                return corsConfig;
            });
        });
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        http.sessionManagement((session)->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.httpBasic(Customizer.withDefaults());
        http.csrf(csrf -> csrf.disable());
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}

