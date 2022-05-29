package com.example.demojsp.config;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;

import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class HttpMessageConverterConfig extends WebMvcConfigurationSupport{

    @Bean
    public MappingJackson2HttpMessageConverter mappingJackson2HttpMessageConverter() {
        final MappingJackson2HttpMessageConverter jacksonConverter = new MappingJackson2HttpMessageConverter();
        final List<MediaType> mediaTypes = new ArrayList<>();
        mediaTypes.add( MediaType.APPLICATION_JSON_UTF8 );
        mediaTypes.add( MediaType.APPLICATION_OCTET_STREAM );
        mediaTypes.add( MediaType.TEXT_HTML );
        mediaTypes.add( MediaType.TEXT_PLAIN );
        jacksonConverter.setSupportedMediaTypes( mediaTypes );

        final ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setSerializationInclusion( JsonInclude.Include.NON_NULL );
        jacksonConverter.setObjectMapper( objectMapper );
        return jacksonConverter;
    }
/*
    @Bean
    MappingJackson2HttpMessageConverter jsonConverter() {
        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
        //do your customizations here...
        return converter;
    }*/

    @Override
    protected void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        converters.add(mappingJackson2HttpMessageConverter());
        super.addDefaultHttpMessageConverters(converters);
    }
}