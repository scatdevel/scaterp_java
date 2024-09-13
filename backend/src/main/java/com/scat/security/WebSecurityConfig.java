package com.scat.security;

import com.scat.service.UserService;
import com.scat.shared.JwtUtil;
import com.scat.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserService userService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    @Autowired
    public WebSecurityConfig(@Lazy UserService userService, 
                             @Lazy BCryptPasswordEncoder bCryptPasswordEncoder,
                             @Lazy JwtUtil jwtUtil,
                             @Lazy UserRepository userRepository) {
        this.userService = userService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService).passwordEncoder(new BCryptPasswordEncoder());
    }
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .cors()
            .and()
            .csrf().disable()
            .authorizeRequests()
                .antMatchers(SecurityConstants.SIGNUP_URL, SecurityConstants.LOGIN_URL, "/users/forgot-password", "/users/reset-password").permitAll()

                .antMatchers("/admin/login").permitAll()
                .antMatchers("/users/crops/save", "/users/crops/all").permitAll() // Allow access to login without authentication
                .antMatchers("/crops/category/get/all", "/crops/categories/add").permitAll() // Allow access to login without authentication
//                .anyRequest().authenticated() // Require authentication for all other endpoints

                .antMatchers("/users/admin/login").permitAll()
                .antMatchers("/users/admin/create").hasRole("ADMIN")
                .antMatchers("/users/admin/create").permitAll()
                .antMatchers("/users/admin/**").permitAll()
                .antMatchers("/users/admin/admin/{email}").permitAll()
                .antMatchers("/users/create").permitAll()
               .antMatchers("/roles/all").permitAll()  
               .antMatchers("/users/admin/**").permitAll()

                .antMatchers("/users/admin/role/login").permitAll()
                .antMatchers("/users/admin/user/{email}").permitAll()
                .antMatchers("/users/admin/roles/create").permitAll()
                .antMatchers("/users/admin/roles/create").hasRole("ADMIN")              
                .antMatchers("/users/admin/assign-role").hasRole("ADMIN")               
                .antMatchers("/users/admin/fetch/all").permitAll()
               .antMatchers("/admin/**").hasRole("ADMIN")
             .antMatchers("/user/**").hasRole("USER")
                                
                .antMatchers("/users/land-details").hasRole("USER")
                .antMatchers("/users/land-details/submit").permitAll()
                .antMatchers("/**").permitAll()  
                .anyRequest().authenticated()
              
            .and()
            .addFilter(new AuthenticationFilter(authenticationManagerBean(), jwtUtil, userRepository))
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService).passwordEncoder(bCryptPasswordEncoder);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}

