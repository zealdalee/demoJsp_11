package com.example.demojsp.utils;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class JsonUtils {

    protected static final Logger logger = LoggerFactory.getLogger(JsonUtils.class);


    public static String toJson(Object source) {
        return toJson(source, false, false);
    }

    public static String toJson(Object source, boolean isWrapRootValue) {
        return toJson(source, isWrapRootValue, false);
    }

    public static String formattedToJson(Object source) {
        return toJson(source, false, true);
    }

    public static String formattedToJson(Object source, boolean isWrapRootValue) {
        return toJson(source, isWrapRootValue, true);
    }

    public static String toJson(Object source, boolean isWrapRootValue, boolean isFormatted) {
        String jsonStr = "";
        try {
            jsonStr = getObjectWriter(isWrapRootValue, isFormatted).writeValueAsString(source);
        } catch (JsonGenerationException e) {
            logger.error(e.getMessage());
        } catch (JsonMappingException e) {
            logger.error(e.getMessage());
        } catch (IOException e) {
            logger.error(e.getMessage());
        }
        return jsonStr;
    }

    public static String toJson(SimpleModule module, Object source) {
        return toJson(module, source, false, false);
    }

    public static String toJson(SimpleModule module, Object source, boolean isWrapRootValue) {
        return toJson(module, source, isWrapRootValue, false);
    }

    public static String formattedToJson(SimpleModule module, Object source) {
        return toJson(module, source, false, true);
    }

    public static String formattedToJson(SimpleModule module, Object source, boolean isWrapRootValue) {
        return toJson(module, source, isWrapRootValue, true);
    }

    public static String toJson(SimpleModule module, Object source, boolean isWrapRootValue, boolean isFormatted) {
        String jsonStr = "";
        try {
            ObjectMapper mapper = getObjectMapper(isWrapRootValue, isFormatted);
            mapper.registerModule(module);
            jsonStr = mapper.writeValueAsString(source);
        } catch (JsonGenerationException e) {
            logger.error(e.getMessage());
        } catch (JsonMappingException e) {
            logger.error(e.getMessage());
        } catch (IOException e) {
            logger.error(e.getMessage());
        }
        return jsonStr;
    }

    public static <T> T fromJson(File file, Class<T> target) {
        T object = null;
        try {
            object = getObjectMapper(false, false).readValue(file, target);
        } catch (JsonParseException e) {
            logger.error(e.getMessage());
        } catch (JsonMappingException e) {
            logger.error(e.getMessage());
        } catch (IOException e) {
            logger.error(e.getMessage());
        }
        return object;
    }

    public static <T> T fromJson(String source, Class<T> target) {
        return fromJson(source, target, false);
    }

    public static <T> T fromJson(String source, Class<T> target, Class<?>... subTypeCasses) {
        return fromJson(source, target, false, subTypeCasses);
    }

    public static <T> T fromJson(String source, Class<T> target, boolean isWrapRootValue, Class<?>... subTypeCasses) {
        T object = null;
        try {
            object = getObjectMapper(isWrapRootValue, false, subTypeCasses).readValue(source, target);
        } catch (JsonParseException e) {
            logger.error(e.getMessage());
        } catch (JsonMappingException e) {
            logger.error(e.getMessage());
        } catch (IOException e) {
            logger.error(e.getMessage());
        }
        return object;
    }

    public static <T> T fromJson(String source, TypeReference<T> typeReference, Class<?>... subTypeCasses) {
        return fromJson(source, typeReference, false, subTypeCasses);
    }

    public static <T> T fromJson(String source, TypeReference<T> typeReference, boolean isWrapRootValue, Class<?>... subTypeCasses) {
        T object = null;
        try {
            object = getObjectMapper(isWrapRootValue, false, subTypeCasses).readValue(source, typeReference);
        } catch (JsonParseException e) {
            logger.error(e.getMessage());
        } catch (JsonMappingException e) {
            logger.error(e.getMessage());
        } catch (IOException e) {
            logger.error(e.getMessage());
        }
        return object;
    }

    public static JsonNode readTree(String content) {
        return readTree(content, false);
    }

    public static JsonNode readTree(String content, boolean isWrapRootValue) {
        JsonNode rootNode = null;
        try {
            rootNode = getObjectMapper(isWrapRootValue, false).readTree(content);
        } catch (JsonProcessingException e) {
            logger.error(e.getMessage());
        } catch (IOException e) {
            logger.error(e.getMessage());
        }
        return rootNode;
    }

    public static <T> T MapToObject(Map<String, Object> map, Class<T> target, Class<?>... subTypeCasses) {
        return MapToObject(map, target, false, subTypeCasses);
    }

    public static <T> T MapToObject(Map<String, Object> map, Class<T> target, boolean isWrapRootValue, Class<?>... subTypeCasses) {
        String jsonStr = "";
        try {

            jsonStr = getObjectMapper(isWrapRootValue, false, subTypeCasses).writeValueAsString(map);

        } catch (JsonProcessingException e) {
            logger.error(e.getMessage());
        }
        return fromJson(jsonStr, target);
    }

    public static File jsonToFile(File file, JsonNode node)  {
        try {
            getObjectMapper(false, false).writeValue(file, node);
        } catch (JsonProcessingException e) {
            logger.error(e.getMessage());
        } catch (IOException e) {
            logger.error(e.getMessage());
        }
        return file;
    }

    public static Map<String, String> JsonToMap(String content) {
        Map<String, String> map = new HashMap<String, String>();
        if (content == null || content == "")
            return map;
        try {
            map = getObjectMapper(false, false).readValue(content,new TypeReference<HashMap<String, String>>() { });

        } catch (JsonProcessingException e) {
            logger.error(e.getMessage());
        } catch (IOException e) {
            logger.error(e.getMessage());
        }
        return map;
    }

    public static String MapToJson(Map<String, Object> map) {
        return MapToJson(map, false, false);
    }

    public static String MapToFormattedJson(Map<String, Object> map) {
        return MapToJson(map, false, true);
    }


    public static String MapToJson(Map<String, Object> map, boolean isWrapRootValue, boolean isFormatted) {
        String jsonStr = "";
        try {
            jsonStr = getObjectMapper(isWrapRootValue, isFormatted).writeValueAsString(map);
        } catch (JsonProcessingException e) {
            logger.error(e.getMessage());
        }

        return jsonStr;
    }

    public static ObjectMapper getObjectMapper(boolean isWrapRootValue, boolean isFormatted, Class<?>... subTypeCasses) {
        ObjectMapper mapper = new ObjectMapper();
        // ???????????? ?????? ???????????? underscore ??? ??????
        mapper.setPropertyNamingStrategy(PropertyNamingStrategy.CAMEL_CASE_TO_LOWER_CASE_WITH_UNDERSCORES);
        if (isWrapRootValue) {
            mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, true);
            mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, true);
        }
        mapper.disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);
        if (isFormatted) {
            mapper.enable(SerializationFeature.INDENT_OUTPUT);
        }
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        mapper.registerSubtypes(subTypeCasses);

        return mapper;
    }

    public static ObjectWriter getObjectWriter(boolean isWrapRootValue, boolean isFormatted, Class<?>... subTypeCasses) {
        ObjectMapper mapper = getObjectMapper(isWrapRootValue, isFormatted, subTypeCasses);

        FilterProvider filters = new SimpleFilterProvider().setFailOnUnknownId(false);

        ObjectWriter writer = mapper.writer(filters);
        return writer;
    }
}

