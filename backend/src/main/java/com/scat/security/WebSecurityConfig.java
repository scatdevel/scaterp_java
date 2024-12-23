  
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
                .antMatchers("/users/crops/save", "/users/crops/get/{id}", "/users/land-details/all","/users/land-details/submit").permitAll()
                
                .antMatchers("/users/admin/admin-dashboard").hasRole("ADMIN")
                .antMatchers("/users/user-dashboard").hasRole("Farmer")
                .antMatchers("/users/outlet-dashboard").hasRole("OUTLET")
                .antMatchers("/users/godown-dashboard").hasRole("GODOWN").antMatchers("/dashboard/**").hasAnyRole("ADMIN","OUTLET","Farmer","GODOWN")
                
                .antMatchers("/crops/categories/get/all","/users/crops/get/byUser", "/crops/categories/add").permitAll()
                .antMatchers("/crops/categories/update/{id}", "/crops/categories/delete/{id}").permitAll()
                .antMatchers("/users/admin/login","/users/wallet/{userId}").permitAll()
                .antMatchers("/users/admin/add-balance", "/users/find-by-email/{email}").permitAll()

                .antMatchers("/users/admin/create").hasRole("ADMIN")
                .antMatchers("/users/admin/create", "/users/profile").permitAll()
                .antMatchers("/users/wallet/deposit/{userId}", "/users/wallet/createwallet/{userId}", "/user/wallet/balance", "/users/wallet/add-balance").permitAll()
                .antMatchers("/users/transaction/buy").permitAll()

                .antMatchers("/users/admin/**/**","/users/admin/createuser", "/users/outlet/login").permitAll()
                .antMatchers("/roles/all").permitAll()
                .antMatchers("/users/wallet/crop/price/{cropId}").permitAll()
                 .antMatchers("/users/login", "/users/all","/users/outlet/login",  "/users/{username}", "/users/image/{username}").permitAll()
                .antMatchers("/users/api/{email}").permitAll()
                .antMatchers("/users/get/{id}", "/users/crops/all").permitAll() // Ensure this line is accessible
                .anyRequest().authenticated() // Any other requests require authentication
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